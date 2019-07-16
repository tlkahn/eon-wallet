import {orderBy, uniq, head, find, filter} from 'lodash';

Array.prototype.uniq = function() {
  return uniq(this);
};
Array.prototype.orderBy = function (...cond) {
  return orderBy(this, ...cond);
};
Array.prototype.head = function () {
  return head(this);
};
Array.prototype.find = function (...args) {
  return find(this, ...args);
};
Array.prototype.filter = function (pred) {
  return filter(this, pred);
};