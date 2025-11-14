## 💭 Reflection Questions

### 1. How did `event.preventDefault()` help in handling form submission?

**Answer:**

`event.preventDefault()` was crucial for taking full control of the form submission process. Without it, the browser would immediately submit the form to a server (causing a page reload), which would:

- **Prevent our custom validation** from running completely
- **Lose all form data** due to the page refresh
- **Make it impossible to show success messages** in the same context

### 2. What is the difference between using HTML5 validation attributes and JavaScript-based validation? Why might you use both?

**Answer:**

**HTML5 Validation Attributes:**
- **Built-in**: Native browser functionality (required, minlength, pattern, type="email")
- **Fast**: No JavaScript needed, instant basic checks
- **Accessible**: Works even if JavaScript is disabled
- **Limited**: Generic error messages, can't do complex logic (like comparing two fields)

**JavaScript-based Validation:**
- **Flexible**: Can implement any custom logic (password matching, complex patterns)
- **User-friendly**: Create custom, specific error messages
- **Interactive**: Real-time validation as users type
- **Cross-field**: Can compare multiple fields (password vs confirm password)


### 3. Explain how you used `localStorage` to persist and retrieve the username. What are the limitations of `localStorage` for storing sensitive data?

**Answer:**

**How I Used localStorage:**

**Saving the username (on successful registration):**
```javascript
form.addEventListener('submit', (e) => {
  if (isFormValid) {
    localStorage.setItem('username', username.value);
    // Stores: key="username", value="myUserName"
  }
})
```

**Retrieving the username (on page load):**
```javascript
window.addEventListener('DOMContentLoaded', () => {
  const savedUsername = localStorage.getItem('username');
  if (savedUsername) {
    username.value = savedUsername; // Pre-fill the field
  }
})
```
**Critical Limitations of localStorage for Sensitive Data:**

⚠️ **Should not store sensitive data in localStorage for the following reasons:**

1. **No Encryption**: Data is stored in plain text - anyone can read it
2. **Vulnerable**: Malicious scripts can easily access localStorage
3. **Persistent**: Data stays forever until manually cleared
4. **Accessible to All Scripts**: Any JavaScript on the page can read it
5. **No Expiration**: Unlike cookies, no automatic expiration