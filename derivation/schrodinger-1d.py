import matplotlib
matplotlib.use('TKAgg')
import matplotlib.animation as animation
import matplotlib.pyplot as pl
import numpy as np

n = 401
xmin = 0.0
xmax = 1.0
dx = (xmax - xmin) / (n - 1)
dt = 0.3e-6

x = np.linspace(xmin, xmax, n)
xh = x[:-1] + dx * 0.5
u = np.zeros((n), dtype='complex128')
k = 100.0
u = np.exp(1.0j * k * x) * np.exp(-np.power((x - (xmin + xmax) * 0.5) / 0.1, 2))


# A potential:
V = np.zeros(u.shape)
Vcen = 0.75
Vwid = 0.05
Vmag = 1e4
V = np.exp(-np.power((x - Vcen) / Vwid, 8)) * Vmag

# PML:
# Fraction of the domain taken up by PML (max = 0.5 since from two sides):
alpha = 0.1
ppml = 1.0
sigma = np.power(np.clip((np.abs(x / (xmax - xmin) - 0.5) * 2.0 - 1.0 + alpha * 2) / (alpha * 2), 0, 1), ppml)
sigmah = np.power(np.clip((np.abs(xh / (xmax - xmin) - 0.5) * 2.0 - 1.0 + alpha * 2) / (alpha * 2), 0, 1), ppml)

gamma = 1.0
fac1 = 1.0 / (1.0 + np.exp(1.0j * gamma) * sigmah)
fac2 = 1.0 / (1.0 + np.exp(1.0j * gamma) * sigma)

def iterate(u):
  u0 = u * 1.0

  du = np.diff(u) / dx
  du *= fac1
  du2 = np.diff(du) / dx
  du2 = np.r_[[0], du2, [0]]
  du2 *= fac2
  u1 = u - 0.5 * dt * (du2 + V * u) / 1.0j

  du = np.diff(u1) / dx
  du *= fac1
  du2 = np.diff(du) / dx
  du2 = np.r_[[0], du2, [0]]
  du2 *= fac2
  u -= dt * (du2 + V * u) / 1.0j

fig, ax = pl.subplots()
realline, = ax.plot([], [], 'g', lw=1)
imagline, = ax.plot([], [], 'b', lw=1)
absline1, = ax.plot([], [], 'k', lw=2)
absline2, = ax.plot([], [], 'k', lw=2)

xL = xmin + (xmax - xmin) * alpha
xR = xmax - (xmax - xmin) * alpha
ax.plot([xL, xL], [-1.5, 1.5], 'k', lw=1)
ax.plot([xR, xR], [-1.5, 1.5], 'k', lw=1)
ax.plot(x, sigma, 'k', lw=1)
if Vmag > 0:
  Vline, = ax.plot([], [], 'r', lw=2)
ax.set_xlim([x[0], x[-1]])
ax.set_ylim([-1.5, 1.5])
ax.grid()

def init():
  realline.set_data(x, np.real(u))
  imagline.set_data(x, np.imag(u))
  absline1.set_data(x, np.abs(u))
  absline2.set_data(x, -np.abs(u))
  if Vmag > 0:
    Vline.set_data(x, V / Vmag)
  return realline, imagline,

def update(i):
  for i in range(20):
    iterate(u)
  realline.set_ydata(np.real(u))
  imagline.set_ydata(np.imag(u))
  absline1.set_ydata(np.abs(u))
  absline2.set_ydata(-np.abs(u))
  return realline, imagline,

ani = animation.FuncAnimation(fig, update, init_func=init, interval=1, blit=False)

pl.show()
