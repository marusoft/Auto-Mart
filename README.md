# Auto-Mart

[![Build Status](https://travis-ci.org/marusoft/Auto-Mart.svg?branch=develop)](https://travis-ci.org/marusoft/Auto-Mart)
[![Coverage Status](https://coveralls.io/repos/github/marusoft/Auto-Mart/badge.svg?branch=develop)](https://coveralls.io/github/marusoft/Auto-Mart?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/b4277f0c9690bd1cbbe6/maintainability)](https://codeclimate.com/github/marusoft/Auto-Mart/maintainability)

## Application Description
Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.

 <br/><b>Pivotal Tracker:</b> https://www.pivotaltracker.com/n/projects/2346137
 <br/><b>UI:</b> https://marusoft.github.io/Auto-Mart/UI/index.html
 <br/><b> Heroku: </b> https://automart-marusoft.herokuapp.com/api/v1
 <br/><b> API documentation: </b> https://automart15.docs.apiary.io/#

## Table of Content

 [Features](#features)<br>
 [Technology](#technology)<br>
 [Installation](#installation)<br>
 [Testing](#testing)<br>
 [API End Points](#api-end-points)

## Features
Below are the features Auto-Mart app
###  Users

- User can Sign up <br/>
- User can Sign in<br/>
- User (seller) can post a car sale advertisement.<br/>
- User (buyer) can make a purchase order.<br/>
- User (buyer) can update the price of his/her purchase order.<br/>
- User (seller) can update the price of his/her posted AD.<br/>
- User (seller) can mark his/her posted AD as sold.<br/>
- User can view a specific car.<br/>
- User can view all unsold cars.<br/>
- User can view all unsold cars within a price range.<br/>
- Admin can delete a posted AD record.<br/>

## Optional Features
- User can reset password.<br/>
- User can add multiple pictures to a posted ad.<br/>
- User can view all cars of a specific body type.<br/>
- User can view all used unsold cars.<br/>
- User can view all new unsold cars.<br/>
- User can ​ flag/report​ a posted AD as fraudulent.<br/>
- User can view all unsold cards of a specific make (manufacturer).<br/>

## Technology

Modern JavaScript technologies were adopted in this project

ES2015: Also known as ES6 or ECMASCRIPT 6, is a new and widely used version of Javascript
that makes it compete healthily with other languages. See [here](https://en.wikipedia.org/wiki/ECMAScript) for more infromation.

NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment which allows you enjoy the features of Javascript off the web browsers and implement server-side web development.
Visit [here](https://nodejs.org/en/) for more information.

ExressJS: This is the web application framework for Node.js
Visit [here](https://expressjs.com) for more information

Postgres Database: PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.

Codes are written in accordance with Airbnb JavaScript style guide, see [here](https://github.com/airbnb/javascript) for details.

## Installation
1. Clone this repository into your local machine:
```
https://github.com/marusoft/Auto-Mart
```
2. Navigate into the cloned repository in your machine:
```
cd Auto-Mart
```
3. Install dependencies by running.
```
npm install
```
4. Start the application by running
```
npm start
```
5. Install postman to test all endpoints

## Testing
- run test using `npm test`    

## API Routes

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>POST</td> <td>api/v1/auth/signup</td>  <td>Create a user</td></tr>

<tr><td>POST</td> <td>api/v1/auth/signin</td>  <td>Login a user</td></tr>

<tr><td>POST</td> <td>api/v1/car</td>  <td>Create a car sale AD.</td></tr>

<tr><td>GET</td> <td>api/v1/car/:id</td>  <td>View a specific car</td></tr>

<tr><td>DELETE</td> <td>api/v1/car/:id</td>  <td>Admin Delete a specific car AD.</td></tr>

<tr><td>PATCH</td> <td>api/v1/car/:id/status</td> <td>Mark a posted car Ad as sold.</td></tr>

<tr><td>PATCH</td> <td>api/v1/car/:id/price</td> <td>Update the price of a car.</td></tr>

<tr><td>GET</td> <td>api/v1/car</td> <td>View all unsold cars of specific make,state
   * status,manufacturer, body type and price range.</td></tr>
    </table>

<tr><td>GET</td> <td>api/v1/car?status=available&manufacturer=toyota</td> <td>View all unsold cars of a specific make (manufacturer).</td></tr>
    </table>   

<tr><td>GET</td> <td>api/v1/car?status=available&state=used</td> <td>View all unsold cars of a specific state(used).</td></tr>
    </table>

<tr><td>GET</td> <td>api/v1/car?status=available&state=new</td> <td>View all unsold cars of a specific state (new).</td></tr>
    </table>              

<tr><td>GET</td> <td>api/v1/car?bodyType=van</td> <td>View all cars of a specific body type.</td></tr>
    </table> 

<tr><td>GET</td> <td>api/v1/car?status=available&minPrice=30000&maxPrice=378000000</td> <td>User can view all unsold cars within a price range.</td></tr>
    </table> 

<tr><td>POST</td> <td>api/v1/order</td>  <td>Create a purchase order</td></tr>    

<tr><td>PATCH</td> <td>api/v1/order/:orderId/price</td>  <td>Update the price of a purchase order.</td></tr> 

<tr><td>POST</td> <td>api/v1/flag</td>  <td>flag/report a posted AD as fraudulent.</td></tr>     



## Author
- Kehinde Morufudeen Alimi 