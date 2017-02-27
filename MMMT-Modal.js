

Module.register("MMMT-Modal",{
		// Default module config.
		defaults: {
				url: "",
				height:"1700px",
				width:"100%",
				animationSpeed: 1000,
		},

	// Define required styles
	getStyles: function() {
		return [
			'MMMT-Modal.css',  // this file will be loaded from the bootstrapcdn servers.
		]
	},
	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		if (this.config.url != "")
		{
			var modal = document.createElement("div");
			modal.className = "modal";
			var modalContent = document.createElement("div");
			modalContent.className = "modal-content";
			var span = document.createElement("span");
			span.className = "close";
			span.innerHTML = "&times;";
			var self = this;
			span.addEventListener("click", function () {
				self.hide(self.config.animationSpeed,function () {
					self.config.url = "";
					self.updateDom();
				});

				
			});

			modalContent.appendChild(span);
			var iframe = document.createElement("iframe");
			iframe.className = "iframe";
			iframe.height = "100%";
			iframe.width = "100%";
			iframe.src = this.config.url;
			
			modalContent.appendChild(iframe);
			modal.appendChild(modalContent);
			wrapper.appendChild(modal);
		}

		
		return wrapper;
	},
	
	
	// Override the default NotificationRecieved function
    notificationReceived: function (notification, payload, sender) {
        if (notification === "CHANGE_URL") {
			var self = this;
			this.show(this.config.animationSpeed,function () {
				self.config.url = payload;
				self.updateDom();
			});
        } 
    },

});
