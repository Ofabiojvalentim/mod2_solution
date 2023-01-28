(function(){
	'use strict'



	angular.module("ShoppingListCheckOff",[])
	.controller("ToBuyController",ToBuyController)
	.controller("AlreadyBoughtController",AlreadyBoughtController)
	.service("ShoppingListCheckOffService",ShoppingListCheckOffService);


	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {
		var ToBuyList = this;

		ToBuyList.ItemsToCheck = ShoppingListCheckOffService.getToBuyItems();

		ToBuyList.RemoveItem = function (index) {
			ShoppingListCheckOffService.RemoveItem(index);
			
		}

		//ToBuyList.messenger = "Everything is bought!";
		ToBuyList.messenger = "Everything";

			
	};


	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService){
		var BoughtList = this;

		BoughtList.ItemsChecked = ShoppingListCheckOffService.getAlreadyBoughtItems();

		BoughtList.msg = function(){

			if(this.ItemsChecked.length == 0){
				return "is zero";
			}else{
				return "You Bougth " 
				+ this.ItemsChecked[this.ItemsChecked.length-1].quantity
				+ this.ItemsChecked[this.ItemsChecked.length-1].name
			};
			

		};



	};




	function ShoppingListCheckOffService(){
		
		var service = this;

		var BoughtItems = [];

		var ToBuyItems = [
			{
				quantity:1,
				name:"Milk"
			},
			{
				quantity:3,
				name:"Suggar"
			},
			{
				quantity:5,
				name:"Baccon"
			},
			{
				quantity:7,
				name:"Cake"
			},
			{
				quantity:9,
				name:"Coffee"
			},


		];

		service.RemoveItem = function(index){
			var array = ToBuyItems[index].name;
			var item = {
				quantity: ToBuyItems[index].quantity,
				name: ToBuyItems[index].name
			};

			BoughtItems.push(item);
			ToBuyItems.splice(index,1);
			BoughtItems.$apply;
			
			console.log(" " + BoughtItems[BoughtItems.length-1].name);

		};

		service.addItem = function(name,quantity){
			var item = {
				name:name,
				quantity,quantity
			}

			BoughtItems.push(item);
		};



		service.getToBuyItems = function(){

			return ToBuyItems;
		};

		service.getAlreadyBoughtItems = function(){

			return BoughtItems;
		};

	};

})();