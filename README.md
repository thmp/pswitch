# pswitch

Turn boring checkboxes into cool-looking switches using pswitch. 

## Usage instructions

pswitch is easy to integrate. It relies on jQuery, which you probably already have included in your project. Just add the stylesheet and javascript files (here in /dist) to your project page. To create a switch, call

```javascript
$("input.pswitch").pswitch();
```

To display labels on the sides of the switch for the on and off state, define two data attributes on the checkbox.

```html
<input type="checkbox" class="pswitch" data-on="Live" data-off="Test" />
```

You can check the current state of the checkbox using the standard jQuery method.

```javascript
$("input.pswitch").prop("checked");
// returns true or false
```

To check or uncheck the checkbox programmatically, use jQuery to trigger the check or uncheck event on them.

```javascript
// check a checkbox
$("input.pswitch").trigger("check");

// uncheck a checkbox
$("input.pswitch").trigger("uncheck");

// you can also toggle the state!
$("input.pswitch").trigger("toggle");
```

## Still to be implemented
- When changing the data-on/off labels of a checkbox, the html labels should change accordingly
- Also support not having labels
- Include options to
-- Change size
-- Change color