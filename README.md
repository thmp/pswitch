# pswitch

Turn boring checkboxes into cool-looking switches using pswitch. 
Demo at http://www.pischke.me/pswitch/demo/pswitch.html

## Usage instructions

pswitch is easy to integrate. It relies on jQuery, which you probably already have included in your project. Just add the stylesheet and javascript files (here in /dist) to your project page. If you use bower, you can add the project to your components.

```javascript
    "pswitch": "git@github.com:thmp/pswitch.git"
```

To create a switch, call

```javascript
$("input.pswitch").pswitch();
```

To display labels on the sides of the switch for the on and off state, define two data attributes on the checkbox. The switch will be displayed without labels if you do not specify them.

```html
<input type="checkbox" class="pswitch" data-checked="Live" data-unchecked="Test" />
```

You can check the current state of the checkbox using the standard jQuery method.

```javascript
$("input.pswitch").prop("checked");
// returns true or false
```

Blue does not fit your webpage style? To change the switch color, just pass the color code for the switch on creation to the pswitch function.

```javascript
$("input.pswitch").pswitch({r: 25, g: 120, b: 30});
```

This would for example create a green switch.

To check or uncheck the checkbox programmatically, use jQuery to trigger the check or uncheck event on them.

```javascript
// check a checkbox
$("input.pswitch").trigger("check");

// uncheck a checkbox
$("input.pswitch").trigger("uncheck");

// you can also toggle the state!
$("input.pswitch").trigger("toggle");
```

The switch also supports enabled and disabled states. You can manually set the checkbox state in the html before creating a pswitch or programmatically afterwards using these triggers.

```javascript
// enable switch
$("input.pswitch").trigger("enable");

// disable switch
$("input.pswitch").trigger("disable");
```

## Still to be implemented
- When changing the data-on/off labels of a checkbox, the html labels should change accordingly
- Include options to change size