# React + Vite

## Implemetations - Brief Explanation
- `app/pages/emailVerification.jsx`
```javascript
const handleKeyDown = (i, e) => {
        if (e.key === "Backspace" && !code[i] && i > 0) {
            inputRefs.current[index - 1].focus()
        }
}
```
```javascript
if (e.key === "Backspace" && !code[i] && i > 0):
```
This condition checks three things:

``` javascript
e.key === "Backspace" 
```
: Checks if the "Backspace" key was pressed.


``` javascript
!code[i]
```
: Checks if the current input field (represented by code[i]) is empty. This prevents moving backward if there's a character in the field.

``` javascript
i > 0
```
: Ensures the current input field is not the first one (index 0), as there’s nowhere left to go back.

``` javascript
inputRefs.current[index - 1].focus()
```
: If the conditions are met, this line moves the focus to the previous input field. This allows the user to backspace through the fields, moving backward if they reach an empty field.
