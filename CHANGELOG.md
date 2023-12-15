# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.0.1](https://github.com/zthun/cirque/compare/v5.0.0...v5.0.1) (2023-12-15)

**Note:** Version bump only for package @zthun/circus





## [5.0.0](https://github.com/zthun/cirque/compare/v4.3.2...v5.0.0) (2023-12-01)


### ⚠ BREAKING CHANGES

* destroying the selenium web driver is now the responsibility of the setup
* the driver no longer destroys the underlying selenium driver
* the destroy method on the driver is now optional

### Features

* cirque web adds the documentation site for circus ([ef57b19](https://github.com/zthun/cirque/commit/ef57b19c609e428799551912ff5349534dd22b35))
* destroying the selenium web driver is now the responsibility of the setup ([af158a8](https://github.com/zthun/cirque/commit/af158a883d1bfc3bb0d004db42d59d555bf00bbe))
* setups many now include a destroy method ([b7339d8](https://github.com/zthun/cirque/commit/b7339d8683121bdd869d9bd8253db13fcefe0665))
* the cirque-react project is the todo app renamed from the old cirque-web ([788cabf](https://github.com/zthun/cirque/commit/788cabf211a122f154152ea4c04ed4c7096e8b21))
* the destroy method on the driver is now optional ([ecf622a](https://github.com/zthun/cirque/commit/ecf622aae1a4b60aa222e41fa30d3cda8c1a5c26))
* the driver no longer destroys the underlying selenium driver ([5b2dfa1](https://github.com/zthun/cirque/commit/5b2dfa1999f2c657feffbc07a3a9523c79ba382f))



## [4.3.2](https://github.com/zthun/cirque/compare/v4.3.1...v4.3.2) (2023-11-21)


### Bug Fixes

* updated selenium to discover newer versions of chrome ([7c217aa](https://github.com/zthun/cirque/commit/7c217aad39049d8be3e3a0b70a1efb327d3af974))



## [4.3.1](https://github.com/zthun/cirque/compare/v4.3.0...v4.3.1) (2023-07-26)


### Bug Fixes

* scrolling into view now uses nearest to ensure its on screen ([95ed259](https://github.com/zthun/cirque/commit/95ed2594177c70b620829211445ee9bfa0e9f87d))



## [4.3.0](https://github.com/zthun/cirque/compare/v4.2.0...v4.3.0) (2023-04-23)


### Features

* debouncing a wait now supports delaying checks for animations ([8ad179c](https://github.com/zthun/cirque/commit/8ad179c1c5b0129d817a5911a1fceb6dc41b7327))



## [4.2.0](https://github.com/zthun/cirque/compare/v4.1.0...v4.2.0) (2023-02-19)


### Features

* updated dependencies to latest versions ([bdbc652](https://github.com/zthun/cirque/commit/bdbc652148438359dd98057cc9a7a422c0cdf78f))


### Bug Fixes

* vite and vitest should be dev dependencies ([51d8a8a](https://github.com/zthun/cirque/commit/51d8a8aa2607b458285505000c768ecc09ede935))



## 4.1.0 (2023-01-06)


### Features

* initial commit ([55b000d](https://github.com/zthun/cirque/commit/55b000dab2a283f19d28c63ea246112552dc1c98))
* supports chrome, edge, and firefox ([9c190b2](https://github.com/zthun/cirque/commit/9c190b2babc9eef729483be903bbcd10687a1833))
* web application for testing ([1de6d19](https://github.com/zthun/cirque/commit/1de6d193b4d4a2a5336e742a00337f6cbec63329))
