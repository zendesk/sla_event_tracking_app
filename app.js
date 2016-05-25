(function() {

  return {

    events: {
      'app.activated': 'init',
      'ticket.updated': 'init',

      //toggles buttons in slainfo
      'click #target_toggle': function(event) {
        this.$('.targets').toggle();
      },
      'click #first_reply_time_toggle': function(event) {
        this.$('#first_reply_time').toggle();
        var currentTime = Date.now();
        var currentTimeFormat = moment(currentTime).format('YYYY-MM-DD [at] hh:mm:ss a z');
        var userTime = this.$('#first_reply_time #timestamp_breach');
        var userTimeValue = userTime.last().text();
        var badge = this.$('#first_reply_time #breach');
        var history = this.$('p#first_reply_time.history_complete');
        if (userTimeValue > currentTimeFormat) {
          userTime.last().toggle();
          badge.last().toggle();
          history.css("marginBottom", "-18px");
        }
      }, 
      'click #next_reply_time_toggle': function(event) {
        this.$('#next_reply_time').toggle();
        var currentTime = Date.now();
        var currentTimeFormat = moment(currentTime).format('YYYY-MM-DD [at] hh:mm:ss a z');
        var userTime = this.$('#next_reply_time #timestamp_breach');
        var userTimeValue = userTime.last().text();
        var badge = this.$('#next_reply_time #breach');
        var history = this.$('p#next_reply_time.history_complete');
        if (userTimeValue > currentTimeFormat) {
          userTime.last().toggle();
          badge.last().toggle();
          history.css("marginBottom", "-18px");
        }
      }, 
      'click #periodic_update_time_toggle': function(event) {
        this.$('#periodic_update_time').toggle();
        var currentTime = Date.now();
        var currentTimeFormat = moment(currentTime).format('YYYY-MM-DD [at] hh:mm:ss a z');
        var userTime = this.$('#periodic_update_time #timestamp_breach');
        var userTimeValue = userTime.last().text();
        var badge = this.$('#periodic_update_time #breach');
        var history = this.$('p#periodic_update_time.history_complete');
        if (userTimeValue > currentTimeFormat) {
          userTime.last().toggle();
          badge.last().toggle();
          history.css("marginBottom", "-18px");
        }
      },
      'click #requester_wait_time_toggle': function(event) {
        this.$('#requester_wait_time').toggle();
        var currentTime = Date.now();
        var currentTimeFormat = moment(currentTime).format('YYYY-MM-DD [at] hh:mm:ss a z');
        var userTime = this.$('#requester_wait_time #timestamp_breach');
        var userTimeValue = userTime.last().text();
        var badge = this.$('#requester_wait_time #breach');
        var history = this.$('p#requester_wait_time.history_complete');
        if (userTimeValue > currentTimeFormat) {
          userTime.last().toggle();
          badge.last().toggle();
          history.css("marginBottom", "-18px");
        }
      }, 
      'click #agent_work_time_toggle': function(event) {
        this.$('#agent_work_time').toggle();
        var currentTime = Date.now();
        var currentTimeFormat = moment(currentTime).format('YYYY-MM-DD [at] hh:mm:ss a z');
        var userTime = this.$('#agent_work_time #timestamp_breach');
        var userTimeValue = userTime.last().text();
        var badge = this.$('#agent_work_time #breach');
        var history = this.$('p#agent_work_time.history_complete');
        if (userTimeValue > currentTimeFormat) {
          userTime.last().toggle();
          badge.last().toggle();
          history.css("marginBottom", "-18px");
        }
      },

      //toggles button in noslas
      'click #not_detected_toggle': function(event) {
        this.$('.no_sla_explanation').toggle();
      },

      //toggles buttons for glossary      
      'click #glossary': function(event) {
      	if (this.currentUser().locale() === 'es' ||
      		this.currentUser().locale() === 'es-ES' ||
      		this.currentUser().locale() === 'es-419') {
      		this.switchTo('glossary_es', {
      			ticketid: this.ticket().id(),
      		});  
      	} else {
      		this.switchTo('glossary_en', {
      			ticketid: this.ticket().id(),
      		});
      	}
      },
      'click #goback': 'init',

      //toggles buttons in glossary for definitions
      'click #definition1name': function(event) {
        this.$('#definition1').toggle();
      },      
      'click #definition2name': function(event) {
        this.$('#definition2').toggle();
      },
      'click #definition3name': function(event) {
        this.$('#definition3').toggle();
      },
      'click #definition4name': function(event) {
        this.$('#definition4').toggle();
      },
      'click #definition5name': function(event) {
        this.$('#definition5').toggle();
      },
      'click #definition6name': function(event) {
        this.$('#definition6').toggle();
      },
      'click #definition7name': function(event) {
        this.$('#definition7').toggle();
      },
      'click #definition8name': function(event) {
        this.$('#definition8').toggle();
      },
      'click #definition9name': function(event) {
        this.$('#definition9').toggle();
      },
      'click #definition10name': function(event) {
        this.$('#definition10').toggle();
      },
      'click #definition11name': function(event) {
        this.$('#definition11').toggle();
      },      
      'click #definition12name': function(event) {
        this.$('#definition12').toggle();
      },
      'click #definition13name': function(event) {
        this.$('#definition13').toggle();
      },
      'click #definition14name': function(event) {
        this.$('#definition14').toggle();
      },
      'click #definition15name': function(event) {
        this.$('#definition15').toggle();
      },
      'click #definition16name': function(event) {
        this.$('#definition16').toggle();
      },
      'click #definition17name': function(event) {
        this.$('#definition17').toggle();
      },
      'click #definition18name': function(event) {
        this.$('#definition18').toggle();
      },
      'click #definition19name': function(event) {
        this.$('#definition19').toggle();
      },
      'click #definition20name': function(event) {
        this.$('#definition20').toggle();
      },
    },

    requests: {
      //gets the SLA info from the API
      getTicketSlaData: function() {
        var curTicket = this.ticket().id();
        return {
          type: 'GET',
          url: '/api/v2/tickets/' + curTicket + '?include=slas,metric_events',
          dataType: 'json'
        };
      }
    },

    //converts ZD API timestamps into User's local time
    userTime: function(timestamp) {
      var currentAccount = this.currentAccount();
      var currentUser = this.currentUser();
      var currentTimezone = currentUser.timeZone() || currentAccount.timeZone();
      return moment(timestamp).tz(currentTimezone.ianaName())
        .format('YYYY-MM-DD [at] hh:mm:ss a z');
    },

    //removes objects from array containing "type: measure" or "type: update_status"
    removeHistoryTypes: function(array) {
      return _.filter(array, function(e) {
        return (e.type != 'measure' && e.type != 'update_status');
      });
    },

    //attaches metric events to targets
    attachMetricEvents: function(slaJSON, metric_events) {
      var targets = _.map(slaJSON.policy_metrics, 
          function(target) {
            if (target.metric == 'first_reply_time' ||
                target.metric == 'next_reply_time') {
              target.history = metric_events['reply_time'];
            } else {
              target.history = metric_events[target.metric];
            }
            return target;
          });
      return targets;
    },

    //gets the SLA Policy name and time applied to ticket
    getPolicyInfo: function(array) {
      var element = _.chain(array).where({ type: 'apply_sla' }).last().value();
      return {title: element.sla.policy.title, time: element.time};
    },

    //loops through all history arrays and add a usertime key/value pair
    historyUserTimes: function(targets) {
      var self = this;
      _.each(targets, function(target) {
        _.each(target.history, function (history) {
          history['usertime'] = self.userTime(history.time); 
        });
      });
    },

    //loops through all history arrays and add a usertime key/value pair
    breachUserTimes: function(array) {
      var self = this;
      _.each(array, function(element) {
        element['breach_atusertime'] = self.userTime(element.breach_at);
      });
    },

    init: function(e) {
      this.switchTo('loading');
      this.ajax('getTicketSlaData').done(function(data) {
        var self = this;
        var slaJSON = data.ticket.slas;
        var thisID = self.ticket().id();

        if (slaJSON === undefined || slaJSON.policy_metrics.length < 1) {
          this.switchTo('noslas', {
          	ticketid:thisID,
          });  

        } else {

          //creates an object to pass to the templates
          var slaObject = {};
          
          //merges sideloaded data
          slaObject.targets = this.attachMetricEvents(slaJSON, 
              data.ticket.metric_events);

          //strips extra types
          _.each(slaObject.targets, function(target) {
            target.history = self.removeHistoryTypes(target.history);
          });

          //adds user's local times in all places where a timestamp exists
          this.historyUserTimes(slaObject.targets);
          this.breachUserTimes(slaObject.targets);

          this.switchTo('slainfo', {
            sla: slaObject,
            ticketid: thisID,
          });
        }
      })
      .fail(function(err) {
        var thisID = self.ticket().id();
      	this.switchTo('noslas', {
          ticketid: thisID,
        });
      });
    },
  };
}());
