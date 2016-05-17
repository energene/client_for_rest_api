describe('our super awesome angular app', function() {
  it('should have a 2 way data binding', function() {
    browser.get('http://localhost:5000');
    element(by.model('greeting')).sendKeys('hello world');
    element(by.id('greeting')).getText().then(function(text) {
      expect(text).toEqual('hello world');
    });
  });
});
