# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.3.2](https://github.com/politics-rewired/pg-amqp-bridge-node/compare/v1.3.1...v1.3.2) (2021-10-19)


### Bug Fixes

* import from envalid correctly ([c886638](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/c886638a9525253aba454e852fe4e70e42e0f899))

### [1.3.1](https://github.com/politics-rewired/pg-amqp-bridge-node/compare/v1.3.0...v1.3.1) (2021-10-19)

## [1.3.0](https://github.com/politics-rewired/pg-amqp-bridge-node/compare/v1.2.0...v1.3.0) (2021-03-05)


### Features

* use structured logging ([#16](https://github.com/politics-rewired/pg-amqp-bridge-node/issues/16)) ([ae57530](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/ae5753074f54343b50fbc2346460db935d6d9f99))


### Bug Fixes

* remove duplicate import ([ced8c78](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/ced8c78c2dbe2916b09d98fe9e9c71005f9e65e5))

## [1.2.0](https://github.com/politics-rewired/pg-amqp-bridge-node/compare/v1.1.0...v1.2.0) (2021-03-04)


### Features

* **teardown:** end pg-pool ([94afaad](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/94afaad44595badfc83f4dbc0122f21bf9c76f51))

## 1.1.0 (2021-03-04)


### Features

* **exit:** additional exit handlers ([b084019](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/b084019ff01cd2aed7287a4ba6fd30ee93b652bb))
* **reconnect:** additional logging and defensiveness around restart ([16bc870](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/16bc870e0a8f94e0af8cc726212a457dfa83887d))
* ack jobs and renotify unacked jobs ([c38f2b1](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/c38f2b1bc4e37e526998cd2f25f85ca62cd269cd))
* log connection error and shut down ([9d466ce](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/9d466ceecfbc65b6096b0f0c92e068143868b7d4))
* use pg listen for retry and fatal error handling ([7a6ce00](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/7a6ce00a7e048888149ae40c51e5c8f81a31a9f6))


### Bug Fixes

* exit on error in startup ([224b822](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/224b8225f2262482a199a12f2997f321966613c1))
* handle empty message payload safely ([#10](https://github.com/politics-rewired/pg-amqp-bridge-node/issues/10)) ([545c3e0](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/545c3e0ea8d571e46095e1f9321f8975f5c7bce8))
* persist messages ([#13](https://github.com/politics-rewired/pg-amqp-bridge-node/issues/13)) ([8aa6497](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/8aa64978cd0114c9458ce1034ecde6e118c43ae3))
* proper typing for notification handler ([330ceb4](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/330ceb4ff7a6c2508e3ad8ae549625bddc532e25))
* review changes ([fb639ac](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/fb639aca01edfd4438a464e1b0bfb974e3e56c34))

### [1.0.1](https://github.com/politics-rewired/pg-amqp-bridge-node/compare/v1.0.0...v1.0.1) (2020-09-24)


### Bug Fixes

* persist messages ([#13](https://github.com/politics-rewired/pg-amqp-bridge-node/issues/13)) ([8aa6497](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/8aa64978cd0114c9458ce1034ecde6e118c43ae3))

## 1.0.0 (2020-09-22)


### Features

* ack jobs and renotify unacked jobs ([c38f2b1](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/c38f2b1bc4e37e526998cd2f25f85ca62cd269cd))
* log connection error and shut down ([9d466ce](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/9d466ceecfbc65b6096b0f0c92e068143868b7d4))
* use pg listen for retry and fatal error handling ([7a6ce00](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/7a6ce00a7e048888149ae40c51e5c8f81a31a9f6))


### Bug Fixes

* exit on error in startup ([224b822](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/224b8225f2262482a199a12f2997f321966613c1))
* handle empty message payload safely ([#10](https://github.com/politics-rewired/pg-amqp-bridge-node/issues/10)) ([545c3e0](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/545c3e0ea8d571e46095e1f9321f8975f5c7bce8))
* proper typing for notification handler ([330ceb4](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/330ceb4ff7a6c2508e3ad8ae549625bddc532e25))
* review changes ([fb639ac](https://github.com/politics-rewired/pg-amqp-bridge-node/commit/fb639aca01edfd4438a464e1b0bfb974e3e56c34))
