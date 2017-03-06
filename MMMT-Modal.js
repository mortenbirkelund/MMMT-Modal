

Module.register("MMMT-Modal",{
	
		url: "",
		youtube: "",
		
		// Default module config.
		defaults: {
				animationSpeed: 1000,
		},

	// Define required styles
	getStyles: function() {
		return [
			'MMMT-Modal.css'  // this file will be loaded from the bootstrapcdn servers.
		]
	},
	// Define required scripts.
	getScripts: function() {
		return [
			"moment.js",
		];
	},

	
	start: function() {
		this.hide(this.config.animationSpeed);

	},

	// Override dom generator.
	getDom: function() {
		
		
		
		//Only create the modal if nessesary
		if (this.url != "" || this.youtube != "")
		{
			var wrapper = document.createElement("div");
			// Creates the modal without content
			var modal = document.createElement("div");
			modal.className = "modal";
			modal.id = "myModal";
			var modalContent = document.createElement("div");
			modalContent.className = "modal-content";
			modal.appendChild(modalContent);	
			var closeButton = document.createElement("span");
			closeButton.className = "close";
			closeButton.innerHTML = "&times;";
			modalContent.appendChild(closeButton);

			
			var self = this;
			closeButton.addEventListener("click", function () {
				self.hide(self.config.animationSpeed,function () {
					self.url = "";
					self.updateDom();
				});
			});
			modalContent.appendChild(closeButton);
			
			// Creates the content 
			if (this.url != "")
			{
				var iframe = document.createElement("iframe");
				iframe.className = "iframe";
				iframe.height = "100%";
				iframe.width = "100%";
				iframe.src = this.url;
				modalContent.appendChild(iframe);	

				window.onclick = function(event) {
					if (event.target == modal) {
						self.hide(self.config.animationSpeed,function () {
							self.url = "";
							self.updateDom();
						});
					}
				};
			}
			else if (this.youtube != "")
			{
				
				
			}
			else
			{
				return document.createElement("div");
			}
			
			modal.appendChild(modalContent);
			modal.style.display = "block";
			wrapper.appendChild(modal);
			return wrapper;
		}		
		return document.createElement("div");
	},
	
	
	// Override the default NotificationRecieved function
    notificationReceived: function (notification, payload, sender) {
        if (notification === "OPEN_URL") {
			var self = this;
			this.show(this.config.animationSpeed,function () {
				self.url = payload;
				self.updateDom();
			});
        } 
    },

});
