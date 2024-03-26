# Circus Of DOM (Cirque Du DOM)

This is the framework specific circus package for web component / dom based unit testing. Under the hood, this provides
the necessary setup and driver implementations that contains the anti-corruption pattern for basic HTMLElement
selectors.

## Installation

```sh
# NPM
npm install @zthun/cirque @zthun/cirque-du-dom
# Yarn
yarn add @zthun/cirque @zthun/cirque-du-dom
```

## Setup

There are two circus setup classes to this package, [**ZCircusSetupHtml**](./src/setup/circus-setup-html.ts) and
[**ZCircusSetupHtmlElement**](./src/setup/circus-setup-html-element.ts).

Whichever one you need depends on how deep you go when constructing your DOM object. If all you have is string html,
then use ZCircusSetupHtml. If you need full control of the wrapper container element, use ZCircusSetupHtmlElement.

## Example

```typescript
describe('MyComponent', () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  const createTestTarget = () => {
    const htm = html`<my-component></my-component>;`;
    _renderer = new ZCircusSetupHtml(htm);
    _driver = await _renderer.setup();
    return ZCircusBy.first(driver, MyComponentComponentModel);
  };
});
```
