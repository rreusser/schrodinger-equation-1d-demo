# schrodinger-1d

> [The Schrödinger Equation with a potential barrier in 1D](http://demos.rickyreusser.com/schrodinger-equation-1d/)

[![experimental][stability-experimental]][stability-url]
<!--[![Build Status][travis-image]][travis-url]-->
<!--[![npm version][npm-image]][npm-url]-->
<!--[![Dependency Status][david-dm-image]][david-dm-url]-->
<!--[![Semistandard Style][semistandard-image]][semistandard-url]-->


## Introduction

This demo solves [Schrödinger's Equation](https://en.wikipedia.org/wiki/Schr%C3%B6dinger_equation) in the presence of a potential. That is, <p align="center"><img alt="i&bsol;hbar &lcub;&bsol;frac &lcub;&bsol;partial &rcub;&lcub;&bsol;partial t&rcub;&rcub;&bsol;Psi &lpar;&bsol;mathbf &lcub;r&rcub; &comma;t&rpar;&equals;&bsol;left&lsqb;&lcub;&bsol;frac &lcub;-&bsol;hbar &Hat;&lcub;2&rcub;&rcub;&lcub;2&bsol;mu &rcub;&rcub;&bsol;nabla &Hat;&lcub;2&rcub;&plus;V&lpar;&bsol;mathbf &lcub;r&rcub; &comma;t&rpar;&bsol;right&rsqb;&bsol;Psi &lpar;&bsol;mathbf &lcub;r&rcub; &comma;t&rpar;" valign="middle" src="images/ihbar-frac-partial-partial-tpsi-mathbf-r-tlef-d4cf84b0b7.png" width="356.5" height="55"></p> with `hbar = 1` and `µ = 1`. (Actually, please don't rely on the scale factors! I haven't carefully verified them since they don't affect the behavior to within a constant multiple of the inputs.)

This simulation uses [RK-4](https://github.com/scijs/ode-rk4) temporal integration and spectral differentiation (differentiation via the [FFT](https://github.com/scijs/ndarray-fft)) in space. Spectral derivatives resolve wavenumbers perfectly, as opposed to typical second order finite differences which tend to lead to heavy dispersion. The boundary conditions are implemented using the Perfectly Matched Layer (PML) of Berenger [1].

## Examples

(Need to copy the link from the readme source since github mangles my quick and dirty JSON-in-the-url-hash strategy...)

- [Reflection and transmission across a potential barrier](http://demos.rickyreusser.com/schrodinger-equation-1d/#{"pulse":{"center":0.5,"width":0.1,"magnitude":1,"wavenumber":200},"pulse2":{"center":1.5,"width":0.1,"magnitude":0,"wavenumber":-200},"pml":{"width":0.05,"exponent":1,"gamma":1.5707963267948966},"integration":{"dt":0.0000991,"stepsPerIter":5,"method":"rk4"},"potential":{"width":0.1,"magnitude":1000,"inverted":false,"center":1,"exponent":2}})
- [Spreading of the wave packet](http://demos.rickyreusser.com/schrodinger-equation-1d/#{"pulse":{"center":0.5,"width":0.016,"magnitude":1,"wavenumber":400},"pulse2":{"center":1.5,"width":0.018,"magnitude":0,"wavenumber":400},"pml":{"width":0.05,"exponent":1,"gamma":1.5707963267948966},"integration":{"dt":0.0000991,"stepsPerIter":3,"method":"rk4"},"potential":{"width":0.1,"magnitude":0,"inverted":false,"center":1,"exponent":1.98}})
- [Bouncing in a potential well](http://demos.rickyreusser.com/schrodinger-equation-1d/#{"pulse":{"center":1,"width":0.058,"magnitude":1,"wavenumber":202},"pulse2":{"center":1.5,"width":0.018,"magnitude":0,"wavenumber":400},"pml":{"width":0.05,"exponent":1,"gamma":1.5707963267948966},"integration":{"dt":0.0000991,"stepsPerIter":10,"method":"rk4"},"potential":{"width":0.7,"magnitude":2500,"inverted":true,"center":1,"exponent":50}})

<p align="center">
  <a href="http://demos.rickyreusser.com/schrodinger-equation-1d/">
    <img src="images/sample.gif" alt="Reflection and transmission from a potential barrier">
  </a>
</p>

[View demo →](http://demos.rickyreusser.com/schrodinger-equation-1d/)

In the demo, the blue and green lines are the real and imaginary components of the wavefunction, with the envelope displayed in black. The red represents the potential barrier with scale displayed on the right, and the gray represents the perfectly matched layer which suppresses reflections.

## To Do

- Verify and tighten up the constant scale factors

## References

[1] Berenger, J.-P. "[A Perfectly Matched Layer for the Absorption of Electromagnetic Waves](http://web.stanford.edu/class/ee256/Berenger1994.pdf)", Journal of Computational Physics. 114, 185-200 (1994).

## License

&copy; 2016 Ricky Reusser. MIT License.




<!-- BADGES -->

[travis-image]: https://travis-ci.org/rreusser/schrodinger-1d.svg?branch=master
[travis-url]: https://travis-ci.org//schrodinger-1d

[npm-image]: https://badge.fury.io/js/schrodinger-1d.svg
[npm-url]: https://npmjs.org/package/schrodinger-1d

[david-dm-image]: https://david-dm.org/rreusser/schrodinger-1d.svg?theme=shields.io
[david-dm-url]: https://david-dm.org/rreusser/schrodinger-1d

[semistandard-image]: https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square
[semistandard-url]: https://github.com/Flet/semistandard

<!-- see stability badges at: https://github.com/badges/stability-badges -->
[stability-url]: https://github.com/badges/stability-badges
[stability-deprecated]: http://badges.github.io/stability-badges/dist/deprecated.svg
[stability-experimental]: http://badges.github.io/stability-badges/dist/experimental.svg
[stability-unstable]: http://badges.github.io/stability-badges/dist/unstable.svg
[stability-stable]: http://badges.github.io/stability-badges/dist/stable.svg
[stability-frozen]: http://badges.github.io/stability-badges/dist/frozen.svg
[stability-locked]: http://badges.github.io/stability-badges/dist/locked.svg
