sap.ui.define([
    'sap/fe/core/PageController', "sap/ui/model/json/JSONModel", "sap/m/MessageToast","sap/m/MessageBox"
], function (PageController, JSONModel, MessageToast,MessageBox) {
    'use strict';

    return PageController.extend('zempcapm1fiori.ext.main.Main', {

		onInit : function(){

		},
        onAfterRendering: function (oEvent) {
            var oView = this.getView();
            var mFBConditions = new JSONModel({allFilters: "", expanded: false, filtersTextInfo: oView.byId("FilterBar").getActiveFiltersText()});
            oView.setModel(mFBConditions, "fbConditions");
        },
        handlers: {
            onFiltersChanged: function (oEvent) {
                var oView = this.getView();
                var filterBar = oView.byId("FilterBar");
                var allFilters = filterBar.getFilters();

                var oSource = oEvent.getSource();
                var mFBConditions = oSource.getModel("fbConditions");
                mFBConditions.setProperty("/allFilters", JSON.stringify(allFilters, null, "  "));

                if (Object.keys(allFilters).length > 0) {
                    mFBConditions.setProperty("/expanded", true);
                }
                MessageToast.show("FilterBar filters are changed!");
                mFBConditions.setProperty("/filtersTextInfo", oSource.getActiveFiltersText());
            }
        },
        onCreate: function () {
            var oModel = this.getOwnerComponent().getModel(); // OData V4 model
            var oBinding = oModel.bindList("/ReadEmpSet");

            // Get values from inputs
            var EMPID = parseInt(this.byId("idEmpid").getValue());
            var EMPNAME = this.byId("idEmpname").getValue();

            // Simple validation
            if (! EMPID || ! EMPNAME) {
                MessageBox.error("Please enter both EMPID and EMPNAME");
                return;
            }

            // Create the entry
            oBinding.create({EMPID: EMPID, EMPNAME: EMPNAME}).created().then(() => {
                MessageToast.show("Employee created successfully");
                var oTable = this.byId("LineItemTable");
            if (oTable) {
                var oTableBinding = oTable.getRowBinding
                    ? oTable.getRowBinding() // for Table
                    : oTable.getBinding("items"); // for List / Macro Table
                if (oTableBinding) {
                    oTableBinding.refresh(); // Triggers re-read from backend
                }
            }
            
            }).catch((err) => {
                MessageBox.error("Creation failed: " + err.message);
            });
        }
    });
});
