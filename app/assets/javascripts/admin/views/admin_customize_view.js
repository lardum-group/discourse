/*global Mousetrap:true */

/**
  A view to handle site customizations

  @class AdminCustomizeView
  @extends Discourse.View
  @namespace Discourse
  @module Discourse
**/
Discourse.AdminCustomizeView = Discourse.View.extend({
  templateName: 'admin/templates/customize',
  classNames: ['customize'],
  selected: 'stylesheet',

  headerActive:           Em.computed.equal('selected', 'header'),
  footerActive:           Em.computed.equal('selected', 'footer'),
  headTagActive:          Em.computed.equal('selected', 'head_tag'),
  bodyTagActive:          Em.computed.equal('selected', 'body_tag'),
  stylesheetActive:       Em.computed.equal('selected', 'stylesheet'),
  mobileHeaderActive:     Em.computed.equal('selected', 'mobileHeader'),
  mobileFooterActive:     Em.computed.equal('selected', 'mobileFooter'),
  mobileStylesheetActive: Em.computed.equal('selected', 'mobileStylesheet'),

  actions: {
    selectHeader:           function() { this.set('selected', 'header'); },
    selectFooter:           function() { this.set('selected', 'footer'); },
    selectHeadTag:          function() { this.set('selected', 'head_tag'); },
    selectBodyTag:          function() { this.set('selected', 'body_tag'); },
    selectStylesheet:       function() { this.set('selected', 'stylesheet'); },
    selectMobileHeader:     function() { this.set('selected', 'mobileHeader'); },
    selectMobileFooter:     function() { this.set('selected', 'mobileFooter'); },
    selectMobileStylesheet: function() { this.set('selected', 'mobileStylesheet'); },

    toggleMaximize: function() {
      this.set("maximized", !this.get("maximized"));

      Em.run.scheduleOnce('afterRender', this, function(){
        $('.ace-wrapper').each(function(){
          $(this).data("editor").resize();
        });
      });

    },
  },

  _init: function() {
    var controller = this.get('controller');
    Mousetrap.bindGlobal('mod+s', function() {
      controller.send("save");
      return false;
    });
  }.on("didInsertElement"),

  _cleanUp: function() {
    Mousetrap.unbindGlobal('mod+s');
  }.on("willDestroyElement")

});
