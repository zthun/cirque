import { ZCircusKeyBuilder } from './circus-key';

/**
 * All keys that conform to the QWERTY layout.
 *
 * Note that these keys conform to the chrome standard since Node itself
 * uses the Chrome JavaScript engine.
 */
export const ZCircusKeyboardQwerty = Object.freeze({
  // Short side
  escape: new ZCircusKeyBuilder('Escape', 'Escape').build(),
  f1: new ZCircusKeyBuilder('F1', 'F1').build(),
  f2: new ZCircusKeyBuilder('F2', 'F2').build(),
  f3: new ZCircusKeyBuilder('F3', 'F3').build(),
  f4: new ZCircusKeyBuilder('F4', 'F4').build(),
  f5: new ZCircusKeyBuilder('F5', 'F5').build(),
  f6: new ZCircusKeyBuilder('F6', 'F6').build(),
  f7: new ZCircusKeyBuilder('F7', 'F7').build(),
  f8: new ZCircusKeyBuilder('F8', 'F8').build(),
  f9: new ZCircusKeyBuilder('F9', 'F9').build(),
  f10: new ZCircusKeyBuilder('F10', 'F10').build(),
  f11: new ZCircusKeyBuilder('F11', 'F11').build(),
  f12: new ZCircusKeyBuilder('F12', 'F12').build(),

  backquote: new ZCircusKeyBuilder('`', 'Backquote').upper('~').printable().build(),
  digit1: new ZCircusKeyBuilder('1', 'Digit1').upper('!').printable().build(),
  digit2: new ZCircusKeyBuilder('2', 'Digit2').upper('@').printable().build(),
  digit3: new ZCircusKeyBuilder('3', 'Digit3').upper('#').printable().build(),
  digit4: new ZCircusKeyBuilder('4', 'Digit4').upper('$').printable().build(),
  digit5: new ZCircusKeyBuilder('5', 'Digit5').upper('%').printable().build(),
  digit6: new ZCircusKeyBuilder('6', 'Digit6').upper('^').printable().build(),
  digit7: new ZCircusKeyBuilder('7', 'Digit7').upper('&').printable().build(),
  digit8: new ZCircusKeyBuilder('8', 'Digit8').upper('*').printable().build(),
  digit9: new ZCircusKeyBuilder('9', 'Digit9').upper('(').printable().build(),
  digit0: new ZCircusKeyBuilder('0', 'Digit0').upper(')').printable().build(),
  backspace: new ZCircusKeyBuilder('BackSpace', 'Backspace').build(),

  tab: new ZCircusKeyBuilder('Tab', 'Tab').build(),
  keyQ: new ZCircusKeyBuilder('q', 'KeyQ').upper('Q').printable().build(),
  keyW: new ZCircusKeyBuilder('w', 'KeyW').upper('W').printable().build(),
  keyE: new ZCircusKeyBuilder('e', 'KeyE').upper('E').printable().build(),
  keyR: new ZCircusKeyBuilder('r', 'KeyR').upper('R').printable().build(),
  keyT: new ZCircusKeyBuilder('t', 'KeyT').upper('T').printable().build(),
  keyY: new ZCircusKeyBuilder('y', 'KeyY').upper('Y').printable().build(),
  keyU: new ZCircusKeyBuilder('u', 'KeyU').upper('U').printable().build(),
  keyI: new ZCircusKeyBuilder('i', 'KeyI').upper('I').printable().build(),
  keyO: new ZCircusKeyBuilder('o', 'KeyO').upper('O').printable().build(),
  keyP: new ZCircusKeyBuilder('p', 'KeyP').upper('P').printable().build(),
  bracketLeft: new ZCircusKeyBuilder('[', 'BracketLeft').upper('{').printable().build(),
  bracketRight: new ZCircusKeyBuilder(']', 'BracketRight').upper('}').printable().build(),
  backslash: new ZCircusKeyBuilder('\\', 'Backslash').upper('|').printable().build(),

  capsLock: new ZCircusKeyBuilder('CapsLock', 'CapsLock').shift().toggle().build(),
  keyA: new ZCircusKeyBuilder('a', 'KeyA').upper('A').printable().build(),
  keyS: new ZCircusKeyBuilder('s', 'KeyS').upper('S').printable().build(),
  keyD: new ZCircusKeyBuilder('d', 'KeyD').upper('D').printable().build(),
  keyF: new ZCircusKeyBuilder('f', 'KeyF').upper('F').printable().build(),
  keyG: new ZCircusKeyBuilder('g', 'KeyG').upper('G').printable().build(),
  keyH: new ZCircusKeyBuilder('h', 'KeyH').upper('H').printable().build(),
  keyJ: new ZCircusKeyBuilder('j', 'KeyJ').upper('J').printable().build(),
  keyK: new ZCircusKeyBuilder('k', 'KeyK').upper('K').printable().build(),
  keyL: new ZCircusKeyBuilder('l', 'KeyL').upper('L').printable().build(),
  semiColon: new ZCircusKeyBuilder(';', 'Semicolon').upper(':').printable().build(),
  quote: new ZCircusKeyBuilder("'", 'Quote').upper('"').printable().build(),
  enter: new ZCircusKeyBuilder('Enter', 'Enter').build(),

  shiftLeft: new ZCircusKeyBuilder('Shift', 'ShiftLeft').modifier().shift().build(),
  keyZ: new ZCircusKeyBuilder('z', 'KeyZ').upper('Z').printable().build(),
  keyX: new ZCircusKeyBuilder('x', 'KeyX').upper('X').printable().build(),
  keyC: new ZCircusKeyBuilder('c', 'KeyC').upper('C').printable().build(),
  keyV: new ZCircusKeyBuilder('v', 'KeyV').upper('V').printable().build(),
  keyB: new ZCircusKeyBuilder('b', 'KeyB').upper('B').printable().build(),
  keyN: new ZCircusKeyBuilder('n', 'KeyN').upper('N').printable().build(),
  keyM: new ZCircusKeyBuilder('m', 'KeyM').upper('M').printable().build(),
  comma: new ZCircusKeyBuilder(',', 'Comma').upper('<').printable().build(),
  period: new ZCircusKeyBuilder('.', 'Period').upper('>').printable().build(),
  slash: new ZCircusKeyBuilder('/', 'Slash').upper('?').printable().build(),
  shiftRight: new ZCircusKeyBuilder('Shift', 'ShiftRight').modifier().shift().build(),

  controlLeft: new ZCircusKeyBuilder('Control', 'ControlLeft').modifier().build(),
  metaLeft: new ZCircusKeyBuilder('Meta', 'MetaLeft').modifier().build(),
  altLeft: new ZCircusKeyBuilder('Alt', 'AltLeft').modifier().build(),
  space: new ZCircusKeyBuilder(' ', 'Space').printable().build(),
  altRight: new ZCircusKeyBuilder('Alt', 'AltRight').modifier().build(),
  contextMenu: new ZCircusKeyBuilder('ContextMenu', 'ContextMenu').build(),
  controlRight: new ZCircusKeyBuilder('Control', 'ControlRight').modifier().build(),

  // Extended Keys
  printScreen: new ZCircusKeyBuilder('F13', 'F13').build(),
  scrollLock: new ZCircusKeyBuilder('F14', 'F14').build(),
  pause: new ZCircusKeyBuilder('F15', 'F15').build(),

  insert: new ZCircusKeyBuilder('Help', 'Insert').toggle().build(),
  home: new ZCircusKeyBuilder('Home', 'Home').build(),
  pageUp: new ZCircusKeyBuilder('PageUp', 'PageUp').build(),

  delete: new ZCircusKeyBuilder('Delete', 'Delete').build(),
  end: new ZCircusKeyBuilder('End', 'End').build(),
  pageDown: new ZCircusKeyBuilder('PageDown', 'PageDown').build(),

  upArrow: new ZCircusKeyBuilder('ArrowUp', 'ArrowUp').build(),
  leftArrow: new ZCircusKeyBuilder('ArrowLeft', 'ArrowLeft').build(),
  downArrow: new ZCircusKeyBuilder('ArrowDown', 'ArrowDown').build(),
  rightArrow: new ZCircusKeyBuilder('ArrowRight', 'ArrowRight').build(),

  // Numpad
  numLock: new ZCircusKeyBuilder('Clear', 'NumLock').toggle().build(),
  numpadDivide: new ZCircusKeyBuilder('/', 'NumpadDivide').build(),
  numpadMultiply: new ZCircusKeyBuilder('*', 'NumpadMultiply').build(),
  numpadSubtract: new ZCircusKeyBuilder('-', 'NumpadSubtract').build(),

  numpad7: new ZCircusKeyBuilder('7', 'Numpad7').printable().build(),
  numpad8: new ZCircusKeyBuilder('8', 'Numpad8').printable().build(),
  numpad9: new ZCircusKeyBuilder('9', 'Numpad9').printable().build(),

  numpad4: new ZCircusKeyBuilder('4', 'Numpad4').printable().build(),
  numpad5: new ZCircusKeyBuilder('5', 'Numpad5').printable().build(),
  numpad6: new ZCircusKeyBuilder('6', 'Numpad6').printable().build(),
  numpadAdd: new ZCircusKeyBuilder('+', 'NumpadAdd').printable().build(),

  numpad1: new ZCircusKeyBuilder('1', 'Numpad1').printable().build(),
  numpad2: new ZCircusKeyBuilder('2', 'Numpad2').printable().build(),
  numpad3: new ZCircusKeyBuilder('3', 'Numpad3').printable().build(),

  numpad0: new ZCircusKeyBuilder('0', 'Numpad0').printable().build(),
  numpadDecimal: new ZCircusKeyBuilder('.', 'NumpadDecimal').printable().build(),
  numpadEnter: new ZCircusKeyBuilder('Enter', 'NumpadEnter').build()
});
