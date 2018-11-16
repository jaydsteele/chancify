Chancify
========

A quick and easy service to generate up object and list resources with randomly generated data from [chancejs.com](https://chancejs.com)

# Table of Contents

<!-- TOC -->

- [Table of Contents](#table-of-contents)
- [What's It For?](#whats-it-for)
- [The 5 Minute Tutorial](#the-5-minute-tutorial)
  - [Step 1: Write a resource descriptor](#step-1-write-a-resource-descriptor)
  - [Step 2: Restart the server](#step-2-restart-the-server)
  - [Step 3: Fetch the resource](#step-3-fetch-the-resource)
- [In More Detail](#in-more-detail)
  - [Descriptors](#descriptors)
  - [Resource types](#resource-types)
  - [Randomness and REST: seeding the API calls](#randomness-and-rest-seeding-the-api-calls)
  - [Paging](#paging)
  - [chancejs.com](#chancejscom)
- [Setup](#setup)
- [Other](#other)
- [License](#license)

<!-- /TOC -->

# What's It For?

You know when you have a great idea for a web app, but you really don't want to spend a kazillion hours writing a server or mocking up data to demo the UI?

Chancify lets you quickly configure and run a server that serves up random objects or lists in the exact format you're dreaming of.

# The 5 Minute Tutorial

## Step 1: Write a resource descriptor

To generate random data in the shape you want, you just need to create a simple resource descriptor and drop it in the /descriptors directory, something like this:

```javascript
// descriptors/simpleUser.js
function simpleUser(chance) {
  return {
    id: () => chance.guid(),
    firstName: () => chance.first(),
    lastName: () => chance.last(),
    birthday: () => chance.birthday({ string: true }),
    email: () => chance.email({ domain: 'example.com' }),
    avatar: () => chance.avatar({ protocol: 'https' }),
  }
}

module.exports = simpleUser
```

## Step 2: Restart the server

    % npm start

## Step 3: Fetch the resource

    // fetch a single item
    % curl http://localhost:7000/item/simpleUser
    {"id":"46848381-512e-5a0e-b732-198bfb5af807","firstName":"Mario","lastName":"Fujiwara","birthday":"6/25/1954","email":"riv@example.com","avatar":"https://www.gravatar.com/avatar/356a603e54119ad68d9390c9bc647b51"}

    // fetch a list of them
    % curl http://localhost:7000/list/simpleUser
    [
      {"id":"46848381-512e-5a0e-b732-198bfb5af807","firstName":"Mario","lastName":"Fujiwara","birthday":"6/25/1954","email":"tid@example.com","avatar":"https://www.gravatar.com/avatar/b0f32c509992ec9ddb4e75ea4efd0fd2"},
      {"id":"af4c4d41-952f-5196-a555-dfc7f4ff4a25","firstName":"Lily","lastName":"Horton","birthday":"3/6/1969","email":"nefec@example.com","avatar":"https://www.gravatar.com/avatar/e147f4025aa3125ad5456bb2e7abc709"},
      {"id":"426aa2e0-fe2b-5f91-a644-e339b94b9efa","firstName":"Lois","lastName":"Aguilar","birthday":"9/9/1969","email":"fuba@example.com","avatar":"https://www.gravatar.com/avatar/9963d43b3251d705c663f871e5bf5944"},
      {"id":"2806be78-159d-5f90-8533-d511442a2e65","firstName":"Terry","lastName":"Lombardi","birthday":"9/27/1971","email":"siboz@example.com","avatar":"https://www.gravatar.com/avatar/c12beea72d8daa04956cb69255e75353"},
      {"id":"f6208c98-c34c-5788-bc1a-06f216a8f0a8","firstName":"Robert","lastName":"O'sullivan","birthday":"12/24/1983","email":"ga@example.com","avatar":"https://www.gravatar.com/avatar/d96034285f177b97b5ea16a866ad5a47"},
      {"id":"4a7c34a4-d09e-5538-90e3-dddcd046220d","firstName":"Nettie","lastName":"Kim","birthday":"1/16/1998","email":"gibcor@example.com","avatar":"https://www.gravatar.com/avatar/a40e02ae422696964fbf8014100ae16f"},
      {"id":"9f9154f8-5a8e-5179-8252-70d69efd032a","firstName":"Katherine","lastName":"Doyle","birthday":"9/20/1980","email":"esaped@example.com","avatar":"https://www.gravatar.com/avatar/268644621ad2351f1c241dbbf74f355d"},
      {"id":"0a766b9d-6364-50de-abba-9a5870e64cb3","firstName":"Isaac","lastName":"Le GallGall","birthday":"11/11/1963","email":"purporpev@example.com","avatar":"https://www.gravatar.com/avatar/6b55605cdc4063d34e5e45befcc2446b"},
      {"id":"ed13bd0b-840f-5791-b1be-7d9cfa06aa37","firstName":"Larry","lastName":"Masuda","birthday":"4/21/1997","email":"ruvwa@example.com","avatar":"https://www.gravatar.com/avatar/56d9a4cc0abc088886d152e1aca08981"},
      {"id":"235268e1-8c37-5a56-975e-fb4ae9fcd729","firstName":"Leo","lastName":"Pope","birthday":"1/17/1977","email":"golak@example.com","avatar":"https://www.gravatar.com/avatar/e6b28a48540d1c1f5f11cc400663a2d3"}
    ]

# In More Detail

## Descriptors

The descriptors are really easy to build and deploy. Create a node file in the descriptors directory that exports a function. This function gets passed a chance object (more on this later) and returns a "template" of the resource you want to produce.

The fields of the template can be constants:

```javascript
function myDescriptor(chance) {
  return {
    constantValue: 42
  }
}
```

Which would generate boring resources like:

    {
      constantValue: 42
    }

Or the fields can be functions that return values. These functions can return anything you want, but because you are passed the *chancejs* object in the description function, you can use that to generate random stuff. For example:

```javascript
function myDescriptor(chance) {
  return {
    name: () => {
      return `${chance.first()} ${chance.last()}`
    }
  }
}
```

Would generate objects like:

    { name: 'Leo Pope' }

You can even create nested objects:

```javascript
function myNestedDescriptor(chance) {
  return {
    id: () => chance.guid()
    name: {
      first: () => chance.first(),
      last: () => name.last(),
    }
  }
}
```

## Resource types

There are two basic types of resources that you can request: an item resource and a list resource.

Lets imagine that you've produced a descriptor called my_crazy_object and put it in the /descriptors directory

To request a single random version of this object, you call the item endpoint:

    % curl http://localhost:7000/item/my_crazy_object

To request a list of random objects, you call the list endpoint:

    % curl http://localhost:7000/list/my_crazy_object

When requesting a list, you can specify how many are returned using the paging query parameters (more on this below). A small number of items at the start of the random data set is returned by default.

## Randomness and REST: seeding the API calls

Chancify is intended to look like a really simple REST API, and as such it is intended to be stateless. How does that work when the values returned are random?

You will actually get the same result every time you call an endpoint, because the chance objects are constructed with a seed that guarantees consistent results.

In order to get different result, you pass a seed value as a URL query parameter. Using different seed values creates different results, but still allows the results to be stateless. For example:

    // curl http://localhost:7000/item/simpleUser?seed=abcdefg
    % curl -G http://localhost:7000/item/simpleUser --data-urlencode "seed=abcdefg"
    {"id":"c4890d96-8f33-58ab-944a-c79c6e8b7feb","firstName":"Lottie","lastName":"Christensen","birthday":"1/14/1972","email":"puwe@example.com","avatar":"https://www.gravatar.com/avatar/1e9f4e12ff111fb392ea5c44faec2a95"}

## Paging

You can page list resources by using the paging query parameters:

* **max**: The maximum total number of items in the list
* **limit**: The maximum number to return in a request (the page size)
* **skip**: The number of items to skip to the start of the page

For example:

    // curl http://localhost:7000/list/simpleUser?max=100&skip=40&limit=20
    % curl -G http://localhost:7000/list/simpleUser --data-urlencode "max=100" --data-urlencode "skip=40" --data-urlencode "limit=20"

If your paging reaches the end of the max items, then the list size returned may be less than the limit (it may even be zero)

## chancejs.com

Chancify is built on top of the very cool [chancejs.com](http://chancejs.com) library, and you can visit the chancejs documentation to see all of the cool random things you can generate in your descriptors.

# Setup

    % git clone git@github.com:jaydsteele/chancify.git
    % cd chancify
    % npm start

To run in a docker container, you can:

    % npm run docker:build
    % npm run docker:run

# Other

Let me know if you use the library and find it useful. Feedback & suggestions are welcome and appreciated!

# License

See [LICENSE](LICENSE)

