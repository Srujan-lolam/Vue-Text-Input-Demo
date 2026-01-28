# vue-input-text-app

## Project setup

```
npm install
```

### Compiles

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

21-01-2026 - Todo

1. Go through the concept of slot and why do we use it
2. explore why are we using the validator for a button type
3. add a text compare feature using routing and navigation links

22-02-2026 - Todo

1. refactor the code
2. Display the validator error message to the user
3. Go through the concept of named slot , scoped slot
4. understand the difference between action and dispatch
5. use modules

Named slot :
we can define multiple slots inside a child compnent and add name attribute so that parent
component can add content in respective slots . name="header"(in child component slot ) , v-slot:"header"(in parent component template)

Scoped slot :
Lets say we have user data(firstName and lastname ) in a child component and we defined slot using user's lastName fallback .but the parent want to send user's firstName from its template .This will not work as user's scope is restrictied to child component only . to make user available to slot content of parent , we can bind the user as an attribute to the slot element
<slot v-bind:user="user">(in child compnent) . attributes bound to slot element are called slot props. <template v-slot:default="slotProps"> (slotProps.user.firstName) ( in parent compnent)

<router-link> --> used in templates as a component , creates a clickable link(like anchor tag)
this.$router.push('/page') --> used in js methods , navigates from code ,may not requried any user action

Some - checks for a value and returns boolean as soon it finds a value .
includes - checks foe a exact value(===)
Use includes when you know the exact value
Use some when you need logic or conditions

feature includes() some()
Takes function ❌ No ✅ Yes
Checks value ✅ Exact value ❌ Uses condition
Works with logic ❌ No ✅ Yes
Stops early ✅ Yes ✅ Yes
Common use Value existence Conditional existence

splice - mutates the original array , array shift happens after deletion , performance might degrade for large arrays . t.c - o(n) , s.c - o(1)
filter - creates a new array , space and time are o(n) , good when we have to remove multiple elements based on conditions
shift - can be sued only for first element
slice - a[:idx] + a[idx:] - still inefficient

Why do we use Key while list rendering ?
Reuse existing DOM elements when possible
Only update elements that changed
Avoid unnecessary re-rendering

TODO - 27-01-2026

1. work on styling
2. Explore on mutations and commit
3. Try with beforeMount method instead of Mount
4. nextTick instead of mounted
5. Add one more number field in home page beside the text field and upon entering a number, show the text of the entered number from the store array in the text box .
6. Why created in TextInputPage instead of mounted

User clicks delete - sync operations - can commit mutations directly ,below is the flow
-> mutation runs immediately -> state updates -> UI updates

async operations can be handled only by dispatching the actions , go through the below flow
User clicks add

1. API call starts --> wait... --> API success --> commit mutation --> state updates --> UI updates

1) Mutation (commit) → “Change state NOW.” (sync)
2) Action (dispatch) → “Do something first, then maybe change state.” (async allowed)

fetch vs axios

1. fetch is an build into web browsers and need notbe installed while axios is a 3rd party library
   which need to be installed
2. we must mansually convert res to JSON while axios automatically transforms to JSON
3. HTTP error like 404 ,500 need to be manually checked for fetch ,axios automatically rejects these errors - axios has built in error handling
4. axios - requires less boiler plate and works everywhere , use axios for large industry ready applications , use fetch for small development projects
