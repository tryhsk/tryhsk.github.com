'use strict';

/* Filters */

angular.module('tryHskFilters', []).filter('HSK', function() {
  return function(input) {
      if ( true) {console.log('yes') } else {console.log('false')}
    return input ? '\u2713' : '\u2718';
  };
});
