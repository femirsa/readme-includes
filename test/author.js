/*!
 * readme-includes <https://github.com/assemble/readme-includes>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
var should = require('should');
var support = require('./support');
var username = require('git-user-name');
var render = support.render;
var ctx;

describe('author', function () {
  beforeEach(function () {
    ctx = {};
    ctx.log = function (msg) {
      console.log(msg);
    };
  });

  afterEach(function () {
    ctx = null
  });

  it('should not render anything when no context is passed', function () {
    render('author', ctx).should.equal('');
  });

  it('should render author heading only', function () {
    ctx.author = {name: 'Jon'};
    render('author', ctx).should.equal('**Jon**\n');
  });

  it('should render author heading with github username', function () {
    ctx.author = {name: 'Jon'};
    ctx.github = {}
    ctx.github.username = 'jonschlinkert';
    render('author', ctx).should.equal('**Jon**\n+ [github/jonschlinkert](https://github.com/jonschlinkert)\n');
  });

  it('should render author heading with twitter username', function () {
    ctx.author = {name: 'Jon'};
    ctx.github = null;
    ctx.twitter = {}
    ctx.twitter.username = 'jonschlinkert';
    render('author', ctx).should.equal('**Jon**\n+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)\n');
  });

  it('should render author heading with twitter and github usernames', function () {
    ctx.author = {name: 'Jon'};
    ctx.twitter = {}
    ctx.twitter.username = 'jonschlinkert';
    ctx.github = {}
    ctx.github.username = 'jonschlinkert';
    render('author', ctx).should.equal('**Jon**\n+ [github/jonschlinkert](https://github.com/jonschlinkert)\n+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)\n');
  });

  it('should render author heading with author url', function () {
    ctx.author = {name: 'Jon Schlinkert', url: 'http://jonschlinkert.com'};
    ctx.twitter = null;
    ctx.github = null;
    (render('author', ctx) + '\n' + render('author/url', ctx)).should.equal('**Jon Schlinkert**\n\n+ [Jon Schlinkert](http://jonschlinkert.com)\n');
  });
});
