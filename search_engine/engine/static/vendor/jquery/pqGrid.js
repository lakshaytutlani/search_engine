var pqGrids = {
	    billAccountReviewGridPQ: {
	        gridDiv: "",
	        $gridDiv: {},
	        pagerDiv: "",
	        data: {},
	        onClick: {},
	        showPType:'',
	        initialize: function(param) {
	            log(param);
	            this.gridDiv = param.gridDiv;
	            this.$gridDiv = $(param.gridDiv);
	            this.pagerDiv = param.pagerDiv;
	            this.showPType = param.showPType;
	            this.data = param.data;
	            this.onClick = param.onClick;
	            this.fillGrid();
	            this.loadGrid();
	        },
	        reloadGrid: function() {
	            this.$gridDiv = $(this.gridDiv);
	            this.$gridDiv.pqGrid('destroy');
	            this.data = window["globalvars"]["assignedAccounts"];
	            this.$gridDiv = $(this.gridDiv);
	            this.fillGrid();
	            this.loadGrid();
	        },
	        loadGrid: function() {
	            this.$gridDiv.pqGrid({
	                width: 920,
	                showTitle: false,            
	                columnBorders: false,
	                numberCell: false,
	                showBottom: true,
	                editable: false,
	                flexWidth: false,
	                columnBorders: true,
	                flexHeight: true,
	                scrollModel:{pace: 'fast', autoFit: true, theme: true },
	            	wrap:false,
	                hwrap:false,
	                resizable: false,
	                groupModel:false,
	                collapsible: false,
	                pageModel: {type: "local", rPP:30, rPPOptions: [10, 20, 30, 50, 100], strRpp:"{0}", strDisplay:"{0} to {1} of {2}"},
	                filterModel: { on: true, mode: "AND", header: true },
	                dataModel: {
		        		data: this.data,
		                sorting: "local",
		                sortIndx: "rank",
		                sortDir: "up"
	                },
	                colModel: [
	                    {title: 'index', hidden: true, dataIndx:'index'},
	                    {title: 'Rank', width: 90, dataIndx: 'rank'},
	                    {title: 'age', hidden: true, dataIndx: 'age'},
	                    {title: 'gender', hidden: true, dataIndx: 'gender'},
	                    {title: globalvars.localResourceMap.bill_accout_review_account, width: 150, 
						 cls:'accountlist-pqaccount-cursor', dataIndx: 'accountId',
							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
	                    {title: 'Top Missing Code', width: 230, dataIndx: 'predCode',
	                        filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup'] }
	                    },         
	                    {title: globalvars.localResourceMap.bill_accout_review_admit_date, align:"center", width: 150,  dataIndx: 'admitDate',
							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
	                    {title: globalvars.localResourceMap.bill_accout_review_discharge_date, align:"center", width: 160,dataIndx: 'dischargeDate',
							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
	                    {title: globalvars.localResourceMap.bill_accout_review_patient_type, width: 180, hidden:(this.showPType?false:true), dataIndx: 'patTypeWithDescription',
							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
	                    },
	                    {title: globalvars.localResourceMap.bill_accout_review_patient_type, width: 180,  hidden:(this.showPType?true:false), dataIndx: 'patSubTypeWithDescription',
							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
	                    },
	                    {title: 'insurance', hidden: true, dataIndx: 'insurance'},
	                   	{title: 'predCodeClassification', hidden: true, dataIndx:'predCodeClassification'},
						{title: 'payerGroup', hidden: true,  dataIndx:'payerGroup'},
	                    {title: globalvars.localResourceMap.bill_accout_review_payer_name, width: 220,  dataIndx: 'insuranceName',
							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
	                    {title: 'isHighlighted', hidden: true, dataIndx: 'isHighlighted'},
	                   	{title: 'isPrimary', hidden: true, dataIndx: 'isHighlighted'},
	                    {title: 'patientId', hidden: true, dataIndx: 'patientId'},
	                    {title: 'transferDate', hidden: true, dataIndx: 'transferDate'},
	                    {title: 'dob', hidden: true, dataIndx: 'dob'}

	                ],
	                create: function(){
	                    var gridRowData = pqGrids.billAccountReviewGridPQ.$gridDiv.pqGrid( "option" , "dataModel.data" );
	                    if(gridRowData && gridRowData.length > 0){
		                    var gridRowDataLength = gridRowData.length;
		                    for (var i = 0; i < gridRowDataLength; i++) {
		                        if (gridRowData[i].isHighlighted == true) {
		                            //log("isHighlighted " + gridRowData[i].accountId + " : " + (i + 1));
		                            pqGrids.billAccountReviewGridPQ.$gridDiv.pqGrid("addClass", { rowIndx: i, cls: 'highlighted_row' } );
		                        }
		                        // if (gridRowData[i].isPrimary == "true") {
		                        //     //log("isPrimary " + gridRowData[i].accountId + " : " + (i + 1));
		                        //     //$(("#prebill_grid_table tr#" + (parseInt(gridRowData[i].index,10) + 1))).addClass("highlighted_row_primary");
		                       	// 	pqGrids.billAccountReviewGridPQ.$gridDiv.pqGrid("addClass", { rowIndx: i, cls: 'highlighted_row_primary' } );

		                        // }
		                    }
		                //pqGrids.billAccountReviewGridPQ.$gridDiv.pqGrid('refreshView' );
            				//pqGrids.billAccountReviewGridPQ.reloadGrid.call(pqGrids.billAccountReviewGridPQ, "");

	                    }
	                },
	                rowClick: this.onClick,
	            });
	        },
	        fillGrid: function() {
	            var datalength = this.data.length;

	            for (var i = 0; i < datalength; i++) {
	            	pqGrids.billAccountReviewGridPQ.data[i].index = i;
	            }
	        }

	    },
	    
	    billAccountReviewGridPQGroup: {
	        gridDiv: "",
	        $gridDiv: {},
	        pagerDiv: "",
	        data: {},
	        onClick: {},
	        showPType:'',
	        filterType:'predCodeClassification',
	        initialize: function(param) {
	            log(param);
	            this.gridDiv = param.gridDiv;
	            this.$gridDiv = $(param.gridDiv);
	            this.pagerDiv = param.pagerDiv;
	            this.showPType = param.showPType;
	            this.data = param.data;
	            this.filterType = param.filterType;
	            this.onClick = param.onClick;
	            this.fillGrid();
	            this.loadGrid();
	        },
	        reloadGrid: function() {
	            this.$gridDiv = $(this.gridDiv);
	            this.$gridDiv.pqGrid('destroy');
	            this.data = window["globalvars"]["assignedAccounts"];
	            this.$gridDiv = $(this.gridDiv);
	            this.fillGrid();
	            this.loadGrid();
	        },
	        loadGrid: function() {
	            this.$gridDiv.pqGrid({
	                width: 920,
	                showTitle: false,            
	                columnBorders: false,
	                numberCell: false,
	                showBottom: true,
	                editable: false,
	                flexWidth: false,
	                columnBorders: true,
	                flexHeight: true,
	                scrollModel:{pace: 'fast', autoFit: true, theme: true },
	            	wrap:false,
	                hwrap:false,
	                resizable: false,
	                groupModel: ((pqGrids.billAccountReviewGridPQGroup.filterType === "Account View")? false:{
		                dataIndx: [pqGrids.billAccountReviewGridPQGroup.filterType],                
		                collapsed: [ true, false],
		                title: ["<b>{0} ({1} Accounts)</b>","{0} - {1}"], 
		                dir: ["up","down"]
		                //,icon: ["circle-plus", "circle-triangle", "triangle"]
		            }),         
	                collapsible: false,
	               // pageModel: {type: "local", rPP:30, rPPOptions: [10, 20, 30, 50, 100], strRpp:"{0}", strDisplay:"{0} to {1} of {2}"},
	                filterModel: { on: true, mode: "AND", header: true },
	                dataModel: {
		        		data: this.data,
		                sorting: "local",
		                sortIndx: "rank",
		                sortDir: "up"
	                },
	                colModel: [
	                    {title: 'index', hidden: true, dataIndx:'index'},
	                    {title: 'Rank', width: 90, dataIndx: 'rank'},
	                    {title: 'age', hidden: true, dataIndx: 'age'},
	                    {title: 'gender', hidden: true, dataIndx: 'gender'},
	                    {title: globalvars.localResourceMap.bill_accout_review_account, width: 150, 
						sortable: false, cls:'accountlist-pqaccount-cursor', dataIndx: 'accountId',
							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
	                    {title: 'Top Missing Code', width: 230, sortable: false, dataIndx: 'predCode',
	                        filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup'] }
	                    },         
	                    {title: globalvars.localResourceMap.bill_accout_review_admit_date, align:"center", width: 150, sortable: false, dataIndx: 'admitDate',
							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
	                    {title: globalvars.localResourceMap.bill_accout_review_discharge_date, align:"center", width: 160, sortable: false, dataIndx: 'dischargeDate',
							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
	                    {title: globalvars.localResourceMap.bill_accout_review_patient_type, sortable: false, width: 180, hidden:(this.showPType?false:true), dataIndx: 'patTypeWithDescription',
							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
	                    },
	                    {title: globalvars.localResourceMap.bill_accout_review_patient_type, sortable: false, width: 180, sortable: false, hidden:(this.showPType?true:false), dataIndx: 'patSubTypeWithDescription',
							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
	                    },
	                    {title: 'insurance', sortable: false, hidden: true, dataIndx: 'insurance'},
	                   	{title: 'predCodeClassification', hidden: true, sortable: false, dataIndx:'predCodeClassification'},
						{title: 'payerGroup', hidden: true, sortable: false, dataIndx:'payerGroup'},

	                    {title: globalvars.localResourceMap.bill_accout_review_payer_name, width: 220, sortable: false, dataIndx: 'insuranceName',
							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
	                    {title: 'isHighlighted', hidden: true, sortable: false, dataIndx: 'isHighlighted'},
	                   	{title: 'isPrimary', hidden: true, sortable: false, dataIndx: 'isHighlighted'},
	                    {title: 'patientId', hidden: true, sortable: false, dataIndx: 'patientId'},
	                    {title: 'transferDate', hidden: true, sortable: false, dataIndx: 'transferDate'},
	                    {title: 'dob', hidden: true, sortable: false, dataIndx: 'dob'}

	                    
	                ],
	                create: function(){
	                    var gridRowData = pqGrids.billAccountReviewGridPQGroup.$gridDiv.pqGrid( "option" , "dataModel.data" );
	                    if(gridRowData && gridRowData.length > 0){
		                    var gridRowDataLength = gridRowData.length;
		                    for (var i = 0; i < gridRowDataLength; i++) {
		                        if (gridRowData[i].isHighlighted == true) {
		                            //log("isHighlighted " + gridRowData[i].accountId + " : " + (i + 1));
		                            pqGrids.billAccountReviewGridPQGroup.$gridDiv.pqGrid("addClass", { rowIndx: i, cls: 'highlighted_row' } );
		                        }
		                        // if (gridRowData[i].isPrimary == "true") {
		                        //     //log("isPrimary " + gridRowData[i].accountId + " : " + (i + 1));
		                        //     //$(("#prebill_grid_table tr#" + (parseInt(gridRowData[i].index,10) + 1))).addClass("highlighted_row_primary");
		                       	// 	pqGrids.billAccountReviewGridPQ.$gridDiv.pqGrid("addClass", { rowIndx: i, cls: 'highlighted_row_primary' } );

		                        // }
		                    }
	                    }
	                },
	                rowClick: this.onClick,
	            });
	        },
	        fillGrid: function() {
	            var datalength = this.data.length;

	            for (var i = 0; i < datalength; i++) {
	            	pqGrids.billAccountReviewGridPQGroup.data[i].index = i;
	            }
	        }

	    },

	     publishCodeListGridPQ: {
	        gridDiv: "",
	        $gridDiv: {},
	        pagerDiv: "",
	        data: {},
	        onClick: {},
	        highlightedRows: [],
	        showPType:'',
	        initialize: function(param) {
	            log(param);
	            this.gridDiv = param.gridDiv;
	            this.$gridDiv = $(param.gridDiv);
	            this.pagerDiv = param.pagerDiv;
	           // this.showPType = param.showPType;
	            this.data = param.data;
	            //this.onClick = param.onClick;
	            this.fillGrid();
	            this.loadGrid();
	        },
	        reloadGrid: function() {
	            this.$gridDiv = $(this.gridDiv);
	            this.$gridDiv.pqGrid('destroy');
	           // this.data = window["globalvars"]["assignedAccounts"];
	            this.$gridDiv = $(this.gridDiv);
	            this.fillGrid();
	            this.loadGrid();
	        },
	        loadGrid: function() {
	            this.$gridDiv.pqGrid({
	                   width: 800,
                       showTitle: false,            
                       columnBorders: false,
                       numberCell: false,
                       showBottom: true,
                       editable: false,
                       flexWidth: false,
                       columnBorders: true,
                       flexHeight: false,
                       scrollModel:{pace: 'fast', autoFit: true, theme: true },
                       resizable: false,
                       hwrap:true,
                       wrap:false,
                       collapsible: false,
                       filterModel: { on: true, mode: "AND", header: true },
                       pageModel: {type: "local", rPP:30, rPPOptions: [10, 20, 30, 50, 100], strRpp:"{0}", strDisplay:"{0} to {1} of {2}"},

                       dataModel: {
                              data: this.data,
                              sorting: "local",
                              // sortIndx: "isExist",
                              // sortDir: "down"
                       },
	                colModel: [
	                    {title: 'index', hidden: true, dataIndx:'index'},
	                    {title: 'Hospital Id', width: 90, align:"center",dataIndx: 'hospitalId',filter: { type: 'textbox', attr: 'placeholder="Search..."',condition: "contain", listeners: ['keyup'] }},
	                    {title: 'Account Id', width: 120, align:"center", dataIndx: 'accountId',filter: { type: 'textbox', attr: 'placeholder="Search..."',condition: "contain", listeners: ['keyup'] }},
	                    {title: 'Pred Key',width: 90,align:"center", dataIndx: 'predKey',filter: { type: 'textbox', attr: 'placeholder="Search..."',condition: "contain", listeners: ['keyup'] }},
	                    {title: 'Pred Code', width: 90, align:"center", dataIndx: 'predCode',filter: { type: 'textbox', attr: 'placeholder="Search..."',condition: "contain", listeners: ['keyup'] }},
	                   	{title: 'Pred Date', width: 90, align:"center", dataIndx: 'predDate',filter: { type: 'textbox', attr: 'placeholder="Search..."',condition: "contain", listeners: ['keyup'] }},
	                   	{title: 'DCHG Code', width: 90, align:"center", dataIndx: 'dchgCode',filter: { type: 'textbox', attr: 'placeholder="Search..."',condition: "contain", listeners: ['keyup'] }},
	                    {title: 'Response', width: 90,align:"center", dataIndx: 'cenAuditorFlag',filter: { type: 'textbox', attr: 'placeholder="Search..."',condition: "contain", listeners: ['keyup'] }},
	                    {title: 'Found', width: 90,align:"center", dataIndx: 'found',filter: { type: 'textbox', attr: 'placeholder="Search..."',condition: "contain", listeners: ['keyup'] }},
	                    {title: 'Sent Flag', width: 90, align:"center", dataIndx: 'sentFlag',filter: { type: 'textbox', attr: 'placeholder="Search..."',condition: "contain", listeners: ['keyup'] }}

	                ],
	                create: function(){
	                    var gridRowData = pqGrids.publishCodeListGridPQ.$gridDiv.pqGrid( "option" , "dataModel.data" );
	                    // var gridRowDataLength = gridRowData.length;
	                    // for (var i = 0; i < gridRowDataLength; i++) {
	                    //     if (gridRowData[i].isHighlighted == true) {
	                    //         //log("isHighlighted " + gridRowData[i].accountId + " : " + (i + 1));
	                    //         pqGrids.publishCodeListGridPQ.$gridDiv.pqGrid("addClass", { rowIndx: i, cls: 'highlighted_row' } );
	                    //     }
	                    // }
	                },
	                //rowClick: this.onClick,
	            });
	        },
	        fillGrid: function() {
	            var datalength = this.data.length;

	            for (var i = 0; i < datalength; i++) {
	            	pqGrids.publishCodeListGridPQ.data[i].index = i;
	            }
	        }

	    },

	    loadConfirmChargesGrid: { // param object holds gridDiv, data
	        gridDiv: "",
	        $gridDiv:{},
	        datalength:"",
	        onClick:{},
	        showExcel:"",
	        gridCreated: false,
	        formatCurrency:function(ui) {
	        	var data = parseFloat(ui.cellData).toFixed(1);
            	 
            	  return (data < 0) ? "$(" + String(data.slice(1)).split("").reverse().join("")
                  .replace(/(\d{3}\B)/g, "$1,")
                  .split("").reverse().join("") + ")" : "$" + String(data).split("").reverse().join("")
                  .replace(/(\d{3}\B)/g, "$1,")
                  .split("").reverse().join("")
           	},
	        loadGrid: function(param) {

	        	if(param.data && param.data.length > 0){

		            this.gridDiv = param.gridDiv;
		            this.$gridDiv = $(param.gridDiv);
		        	this.datalength = param.data.length;
		        	this.onClick = param.onClick;
		        	this.showExcel = param.showExcel;


			        this.$gridDiv.pqGrid({
		                width: 920,
		                showTitle: false,            
		                columnBorders: false,
		                numberCell: false,
		                showBottom: true,
		                editable: false,
		                flexWidth: false,
		                columnBorders: true,
		                flexHeight: true,
		                scrollModel:{pace: 'fast', autoFit: true, theme: true },
		            	wrap:false,
		                hwrap:true,
		                resizable: false,
		                virtualX: true,
	            		virtualY: true,
		                pageModel: {type: "local", rPP:30, rPPOptions: [10, 20, 30, 50, 100], strRpp:"{0}", strDisplay:"{0} to {1} of {2}"},
		                filterModel: { on: true, mode: "AND", header: true },
		                dataModel: {
			        		data: param.data,
			                sorting: "local",
			                sortIndx: "hospitalId",
			                sortDir: "up"
		                },
			            colModel: [
			                {title: '', dataIndx: 'hospitalId', width: 60,hidden:true},
			                {title: globalvars.localResourceMap.confirm_charge_coid, dataIndx: 'shortName', width: 70, align: 'center', sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: 'Auditor Id', dataIndx: 'auditorId', width: 60, align: 'center', sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_acct, dataIndx: 'accountId', width: 60, sortable: true, cls:'accountlist-pqaccount-cursor',
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_hcpc_code, dataIndx: 'hcpcCode', width: 55, align: 'center', sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_dept_code, dataIndx: 'deptCode', width: 55, align: 'center', sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_charge_code, dataIndx: 'chargeCode', width: 55, align: 'center', sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_charge_desp, dataIndx: 'chargeDesc', width: 80, sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: 'NDC CODE', dataIndx: 'ndcCode', width: 50, sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_amount, dataIndx: 'chargeAmount', width: 75, sortable: true, align: 'right',render: pqGrids.loadConfirmChargesGrid.formatCurrency,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_qty, dataIndx: 'quantity', width: 50, sortable: true, align: 'center',
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.other_charge_date_of_service, dataIndx: 'dateOfService', width: 70, sortable: true, align: 'center',
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_comments, dataIndx: 'comments', width: 60, sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_confirm_time, dataIndx: 'confirmTime', width: 98, sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_desc, dataIndx: 'desc', width: 90, sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_found, dataIndx: 'found', width: 10, hidden: true},
			                {title: '', dataIndx: 'uriCharges', width: 10, hidden: true},
			                {title: '', dataIndx: 'billType', width: 10, hidden: true}
			                
			                
			            ],
			            rowClick: this.onClick,
			            create: function() {
			                
	                        var gridRowData = pqGrids.loadConfirmChargesGrid.$gridDiv.pqGrid( "option" , "dataModel.data" );
		
			                if(gridRowData && gridRowData.length > 0){
		    	                for (var i = 0; i < gridRowData.length; i++) {
		    	                    if (gridRowData[i].found == "1") {
				                        log("Highlighted found" + gridRowData[i].acct + "::" + (i + 1));
			                            pqGrids.loadConfirmChargesGrid.$gridDiv.pqGrid("addClass", { rowIndx: i, cls: 'highlighted_row' } );
		    	                        //$(("tr#" + (i + 1))).addClass("highlighted_row");
		    	                    }
		    	                }
		                    }
		
		
			               pqGrids.loadConfirmChargesGrid.gridCreated = true;

			            }
		                
			        });

	        	}else{
	      			dialogs.messageDialog.show({text: globalvars.localResourceMap.confirmed_charge_no_data_msg});

	        	}

	        }

	    },

	    loadConfirmChargesAuditLevelGrid:{ // param object holds gridDiv, data
	        gridDiv: "",
	        $gridDiv:{},
	        datalength:0,
	        onClick:{},
	        gridCreated: false,
	        formatCurrency:function(ui) {
	        	var data = parseFloat(ui.cellData).toFixed(1);
            	 
            	  return (data < 0) ? "$(" + String(data.slice(1)).split("").reverse().join("")
                  .replace(/(\d{3}\B)/g, "$1,")
                  .split("").reverse().join("") + ")" : "$" + String(data).split("").reverse().join("")
                  .replace(/(\d{3}\B)/g, "$1,")
                  .split("").reverse().join("")
           	},
	        loadGrid: function(param) {
	        	
	        	if(param.data && param.data.length > 0){
	    
		            this.gridDiv = param.gridDiv;
		            this.$gridDiv = $(param.gridDiv);
		            this.datalength = param.data.length;
		            this.onClick = param.onClick;
		            this.showExcel = param.showExcel;
		            this.$gridDiv.pqGrid({
		                width: 920,
		                showTitle: false,            
		                columnBorders: false,
		                numberCell: false,
		                showBottom: true,
		                editable: false,
		                flexWidth: false,
		                columnBorders: true,
		                flexHeight: true,
		                scrollModel:{pace: 'fast', autoFit: true, theme: true },
		            	wrap:false,
		                hwrap:true,
		                resizable: false,
		                virtualX: true,
	            		virtualY: true,
		                pageModel: {type: "local", rPP:30, rPPOptions: [10, 20, 30, 50, 100], strRpp:"{0}", strDisplay:"{0} to {1} of {2}"},
		                filterModel: { on: true, mode: "AND", header: true },
		                dataModel: {
			        		data: param.data,
			                sorting: "local",
			                sortIndx: "hospitalId",
			                sortDir: "up"
		                },
		                colModel: [
			                {title: '', dataIndx: 'hospitalId', width: 60,hidden:true},
			                {title: globalvars.localResourceMap.confirm_charge_coid, dataIndx: 'shortName', width: 65, align: 'center', sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: 'Auditor Id', dataIndx: 'auditorId', width: 60, align: 'center', sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_acct, dataIndx: 'accountId', width: 65, sortable: true, cls:'accountlist-pqaccount-cursor',
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_hcpc_code, dataIndx: 'hcpcCode', width: 45, align: 'center', sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_dept_code, dataIndx: 'deptCode', width: 45, align: 'center', sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_charge_code, dataIndx: 'chargeCode', width: 55, align: 'center', sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_charge_desp, dataIndx: 'chargeDesc', width: 65, sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: 'NDC CODE', dataIndx: 'ndcCode', width:50, sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_amount, dataIndx: 'chargeAmount', width: 55, sortable: true, align: 'right',render: pqGrids.loadConfirmChargesAuditLevelGrid.formatCurrency,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_qty, dataIndx: 'quantity', width: 25, sortable: true, align: 'center',
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.other_charge_date_of_service, dataIndx: 'dateOfService', width: 70, sortable: true, align: 'center',
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },

			                {title: globalvars.localResourceMap.confirm_charge_comments, dataIndx: 'comments', width: 65, sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_confirm_time, dataIndx: 'confirmTime', width: 60, sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_desc, dataIndx: 'desc',  width: 60, sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_ext_auditor_flag, dataIndx: 'extAuditorFlag', width: 70, sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			     //            {title: globalvars.localResourceMap.confirm_charge_ext_auditor_comments, dataIndx: 'extAuditorComments', width: 70, sortable: true,
								// filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			     //            },
			                {title: globalvars.localResourceMap.confirm_charge_found, dataIndx: 'found', width: 10, hidden: true},
			                {title: '', dataIndx: 'uriCharges', width: 10, hidden: true},
			               	{title: '', dataIndx: 'billType', width: 10, hidden: true}

			           ],
			           rowClick: this.onClick,

			           create: function() {

	                       var gridRowData = pqGrids.loadConfirmChargesAuditLevelGrid.$gridDiv.pqGrid( "option" , "dataModel.data" );

			               if(gridRowData && gridRowData.length > 0){
				                for (var i = 0; i < gridRowData.length; i++) {
				                    if (gridRowData[i].found == "1") {
				                        log("Highlighted found" + gridRowData[i].acct + "::" + (i + 1));
			                            pqGrids.loadConfirmChargesAuditLevelGrid.$gridDiv.pqGrid("addClass", { rowIndx: i, cls: 'highlighted_row' } );
				                        //$(("tr#" + (i + 1))).addClass("highlighted_row");
				                    }
				                }
			            	}

		
			                
			                
			                pqGrids.loadConfirmChargesAuditLevelGrid.gridCreated = true;

			            },


		         });

	        	}else{
	        		//if (pqGrids.loadConfirmChargesAuditLevelGrid.datalength == 0 || pqGrids.loadConfirmChargesAuditLevelGrid.datalength == undefined) {
			                    //$("#confirm_charges_download_excel").hide();
			                    dialogs.messageDialog.show({text: globalvars.localResourceMap.confirmed_charge_no_data_msg});
			               // }
	        	}

	      }

	    },

		loadGlobalSearchGrid:{ // param object holds gridDiv, data
	        gridDiv: "",
	        $gridDiv:{},
	        datalength:0,
	        onClick:{},
	        gridCreated: false,
	        formatCurrency:function(ui) {
            	var data = parseFloat(ui.cellData).toFixed(1);
            	 return '$' + String(data).split("").reverse().join("")
                  .replace(/(\d{3}\B)/g, "$1,")
                  .split("").reverse().join("");
           	},
	        loadGrid: function(param) {
	        	
	        	if(param.data && param.data.length > 0){
	    
		            this.gridDiv = param.gridDiv;
		            this.$gridDiv = $(param.gridDiv);
		            this.datalength = param.data.length;
		            this.onClick = param.onClick;
		            this.showExcel = param.showExcel;
		            this.$gridDiv.pqGrid({
		                width: 850,
		                showTitle: false,            
		                columnBorders: false,
		                numberCell: false,
		                showBottom: true,
		                editable: false,
		                flexWidth: false,
		                columnBorders: true,
		                flexHeight: true,
		                scrollModel:{pace: 'fast', autoFit: true, theme: true },
		            	wrap:false,
		                hwrap:true,
		                resizable: false,
		                collapsible: false,
		                pageModel: {type: "local", rPP:30, rPPOptions: [10, 20, 30, 50, 100], strRpp:"{0}", strDisplay:"{0} to {1} of {2}"},
		                filterModel: { on: true, mode: "AND", header: true },
		                dataModel: {
			        		data: param.data,
			                sorting: "local",
			                sortIndx: "hospitalId",
			                sortDir: "up"
		                },
		                colModel: [
			                {title: globalvars.localResourceMap.confirm_charge_coid, dataIndx: 'hospitalId', width: 100, align: 'center', sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: globalvars.localResourceMap.confirm_charge_acct, dataIndx: 'accountId', width: 100, sortable: true, cls:'accountlist-account-cursor',
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title:'Patient type', dataIndx: 'patTypeWithDescription', width: 100, align: 'center', sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title: 'Patient Sub-Type', dataIndx: 'patSubTypeWithDescription', width: 100, align: 'center', sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title:'Discharge Date', dataIndx: 'dischargeDate', width: 100, align: 'center', sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title:'Transfer Date', dataIndx: 'transferDate', width: 100, sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
			                {title:'Financial class', dataIndx: 'financialClass', width: 100, sortable: true,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                },
							{title:'Sum (prediction value)', dataIndx: 'sumOfPredValue', width: 100, sortable: true,render: pqGrids.loadGlobalSearchGrid.formatCurrency,
								filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
			                }
			               

			           ],
			           rowClick: this.onClick,

			           create: function() {

	                       var gridRowData = pqGrids.loadGlobalSearchGrid.$gridDiv.pqGrid( "option" , "dataModel.data" );

			               if(gridRowData && gridRowData.length > 0){
				                for (var i = 0; i < gridRowData.length; i++) {
				                    // if (gridRowData[i].found == "1") {
				                    //     log("Highlighted found" + gridRowData[i].acct + "::" + (i + 1));
			                        //     pqGrids.loadGlobalSearchGrid.$gridDiv.pqGrid("addClass", { rowIndx: i, cls: 'highlighted_row' } );
				                    //     //$(("tr#" + (i + 1))).addClass("highlighted_row");
				                    // }
				                }
			            	}

		
			                
			                
			                pqGrids.loadGlobalSearchGrid.gridCreated = true;

			            },


		         });

	        	}else{
	        		//if (pqGrids.loadConfirmChargesAuditLevelGrid.datalength == 0 || pqGrids.loadConfirmChargesAuditLevelGrid.datalength == undefined) {
			                    //$("#confirm_charges_download_excel").hide();
			                    dialogs.messageDialog.show({text: globalvars.localResourceMap.account_no_data_msg});
			               // }
	        	}

	      }

	    },
	// existingChargesGrid: {
	//         gridDiv: "",
	//         $gridDiv: {},
	//         pagerDiv: "",
	//         data: {},
	//         onClick: {},
	//         showPType:'',
	//         savedSuccessfully: true,
	//         isConfirmCharg:false,
	//         isEditable:true,
	//         initialize: function(param) {
	//             log(param);
	//             this.gridDiv = param.gridDiv;
	//             this.$gridDiv = $(param.gridDiv);
	//             this.pagerDiv = param.pagerDiv;
	//             this.showPType = param.showPType;
	//             this.isEditable = param.isEditable;
	//             this.data = param.data;
	//             this.onClick = param.onClick;
	//             this.fillGrid();
	//             this.loadGrid();
	//             this.addTooltip();
	//         },
	//         reloadGrid: function() {
	//             this.$gridDiv = $(this.gridDiv);
	//             this.$gridDiv.pqGrid('destroy');
	//             this.data = window["globalvars"]["assignedAccounts"];
	//             this.$gridDiv = $(this.gridDiv);
	//             this.fillGrid();
	//             this.loadGrid();
	//         },
	//         formatCurrency:function(ui) {
 //            	return ((ui.cellData > 0) ? (parseFloat(Math.round(ui.cellData * 100) / 100).toFixed(2)) : '');
 //        	},
	//         loadGrid: function() {
	//         	this.savedSuccessfully = true;
	//     		var existingGrid =  this.$gridDiv.pqGrid({
	//                 width: 1140,
	//                 height:250,
	//                 showTitle: false,            
	//                 columnBorders: false,
	//                 numberCell: false,
	//                 showBottom: false,
	//                 flexWidth: false,
	//                 columnBorders: true,
 //                    flexHeight: false,
	//                 wrap:false,
	//                 resizable: false,
	//                 hwrap:true,
	//                 collapsible: true,
	//                 scrollModel:{pace: 'fast', autoFit: false, theme: true },
	//             		//pageModel: {type: "local", rPP:30, rPPOptions: [10, 20, 30, 50, 100], strRpp:"{0}", strDisplay:"{0} to {1} of {2}"},
	//                 filterModel: { on: true, mode: "AND", header: true },
	//                 dataModel: {
	// 	        		data: this.data,
	// 	        		sorting: "local",
	// 	                sortIndx: "hcpcCode",
	// 	                sortDir: "down"
		        			               
	//                 },
	    
	    
	//                 editModel: {
	// 	                saveKey: $.ui.keyCode.ENTER,
	// 	                keyUpDown: true,
	// 	                cellBorderWidth: 0,
	// 					onBlur: 'validate',
	// 					select: true
	//                 },
	           
	            	
	// 	                colModel: [
	//                      {title: 'index', hidden: true, dataIndx:'index',editable: false},
	//                     {title:globalvars.localResourceMap.existing_charge_hcpc_code, width: 70, dataIndx: 'hcpcCode',editable: false, align: "center",
	//                 							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
	// 					},
	//                    	{title:globalvars.localResourceMap.existing_charge_dept_code, width: 70, dataIndx: 'dept',editable: false, align: "center",							
	//                    	filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
	// 					},
	//                    	{title:'chargeNumber', width: 100, dataIndx: 'chargeNumber',hidden: true,editable: false, align: "center"},
	//                     {title: globalvars.localResourceMap.existing_charge_charge_code,  width: 70, dataIndx: 'chargeCode', editable: false, align: "center",
	// 						filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
	// 					},

	// 					{title:globalvars.localResourceMap.existing_charge_unit, width: 80, dataIndx: 'quantity',editable: false, align: "center",
	// 											filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
	// 					},
	// 					{title:globalvars.localResourceMap.existing_charge_change_qty, width: 80, dataIndx: 'qty',dataType: "integer",editable: pqGrids.existingChargesGrid.isEditable, align: "center",
	// 					// filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']},

	// 					// editModel: { keyUpDown: true },
	// 					// editor: { select: true },
	// 					  editor: {
	// 	                    type: "textbox"
	// 	                //    select : true

	// 	                   // init: autoCompleteEditor                    
	// 	                },
	// 					 validations: [
	// 					 			   // { type: 'maxLen', value: 3 ,msg: "Enter quantity can not be more than 3 digit"},
	// 					 			   { type: function (ui) {
	// 				                        var value = ui.value,
	// 				                            _found = false;

	// 				                        console.log(value);

	// 				                        if(value.length > 3){
	// 				                        	pqGrids.existingChargesGrid.savedSuccessfully = false;
	// 				                            	ui.msg = "Enter quantity can not be more than 3 digit";
	// 				                            return false;
	// 				                        }else{
	// 				                        	pqGrids.existingChargesGrid.savedSuccessfully = true;
	// 				                        }
					                       	
	// 				                        if (value == 0 && value != '') {
	// 				                        	pqGrids.existingChargesGrid.savedSuccessfully = false;
	// 				                            ui.msg = "Enter a non-zero quantity change in existing charges, or leave the row blank to make no change";
	// 				                            return false;
	// 				                        }else{
	// 				                        	pqGrids.existingChargesGrid.savedSuccessfully = true;

	// 				                        }
	// 				                        return true;
	// 				                    	}, icon: 'ui-icon-info'


 //                    					}
	// 					 			  ],
	// 					editModel: { keyUpDown: true }
	// 					},
	// 					{title:globalvars.localResourceMap.existing_charge_amount, width: 85, dataIndx: 'chargeAmount', fixed: true, align: "right",editable: false,render: pqGrids.existingChargesGrid.formatCurrency,cls:'pq-margin-int',
	// 											filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
	// 					},
	// 					{title:globalvars.localResourceMap.existing_charge_charge_date, width: 80, dataIndx: 'chargeDate',editable: false,	 align: "center",						
	// 						filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
	// 					},
	// 					{title:'Rev Code', width: 60, dataIndx: 'revenueCode',editable: false, align: "center",
	// 											filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
	// 					},
	// 					{title:globalvars.localResourceMap.existing_charge_charge_description, width: 230, dataIndx: 'chargeDesc',editable: false, align:"center",
	// 											filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
	// 					},
	// 					{title:'', width:80, dataIndx:'modifier',hidden:true,editable: false},
	// 					{title:'', width:80, dataIndx:'changeModifier',hidden:true,editable: false},
	// 					{title:'', width:80, dataIndx:'medicareCode',hidden:true,editable: false},
	// 					{title:globalvars.localResourceMap.existing_charge_comment, width: 200, dataIndx: 'comments',editable: pqGrids.existingChargesGrid.isEditable,	align:"center",					
	// 					// filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']},

	// 					editor: {
	// 	                    type: "textbox"
	// 	                   // init: autoCompleteEditor                    
	// 	                },
	// 	                editModel: { keyUpDown: true }

	// 					},
	// 					{title:'POST DATE', width: 100, dataIndx:'postDate',editable: false,	align:"center",						
	// 					filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
	// 					},
	// 					{title:'', width: 90, dataIndx:'predKey',hidden:true,editable: false},
	// 					{title:'', width: 90, dataIndx:'rowEditable',hidden:true,editable: false},
	// 					{title:'', width: 90, dataIndx:'cenAuditorId',hidden:true,editable: false},
	// 					{title:'', width: 90, dataIndx:'cenAuditingTime',hidden:true,editable: false}
 //               ],
	//                 create: function(){
	//                     var gridRowData = pqGrids.existingChargesGrid.$gridDiv.pqGrid( "option" , "dataModel.data" );
	//                     if(gridRowData && gridRowData.length > 0){
	// 	                    var gridRowDataLength = gridRowData.length;
	// 	                    for (var i = 0; i < gridRowDataLength; i++) {
	// 	                        if (gridRowData[i].rowEditable == false || gridRowData[i].rowEditable == "false") {
	// 	                            //log("isHighlighted " + gridRowData[i].accountId + " : " + (i + 1));
	// 	                            pqGrids.existingChargesGrid.$gridDiv.pqGrid("addClass", { rowIndx: i, cls: 'highlighted_row' } );
	// 	                        }
		                      
	// 	                    }
		               
	//                     }
	//                    // pqGrids.existingChargesGrid.addTooltip();
	//                 },
	//               //  rowClick: this.onClick,
	//                 cellSave: function( event, ui ) {
	//                 	console.log('tested ok cellSave');
	//                 	//pqGrids.existingChargesGrid.$gridDiv.pqGrid("refreshCell" ,{ rowIndx: ui.rowIndx});
	//                 },
	//                 cellSelect:function( event, ui ) {
	//                 	console.log('cell select');

	//                 },
	//                 cellBeforeSave:function( event, ui ) {
	//                  	console.log('tested ok  cellBeforeSave');

	//                //  	 var cd = ui.newVal;
	// 		             // if (cd.length > 3) {
	// 		             //    return false;
	// 		             // }

	// 		             // if(cd == 0)
	// 		             // 	return false;

	// 		             // return true;
	//                 },
	//                 editorFocus:function( event, ui ) {
	//                 	console.log("editorEnd");
	//                 	 pqGrids.existingChargesGrid.$gridDiv.pqGrid("saveEditCell" );
	//                 },
	//                 rowClick:function( event, ui ) {
	//                 	console.log('row click');
	//                 },
	//                 rowSelect: function( event, ui ) {	
	//                 	var isValid = existingGrid.pqGrid("isValid", ui).valid;
	//                 	if(isValid)
	//                 		pqGrids.existingChargesGrid.$gridDiv.pqGrid("saveEditCell" );


	//                 	// console.log(isValid);
	//                 	//pqGrids.existingChargesGrid.$gridDiv.pqGrid( "editCell", { rowIndx: ui.rowIndx, dataIndx: 'qty' } );
	//                 	//pqGrids.existingChargesGrid.$gridDiv.pqGrid( "editCell", { rowIndx: ui.rowIndx, dataIndx: 'comments' } );
	                 
	//                 // pqGrids.existingChargesGrid.$gridDiv.pqGrid("addClass", { rowIndx: ui.rowIndx, cls: 'pq-row-edit' });
 //            		 //pqGrids.existingChargesGrid.$gridDiv.pqGrid("editFirstCellInRow", { rowIndx: ui.rowIndx });
 //            		 var currentGetRowData = pqGrids.existingChargesGrid.$gridDiv.pqGrid("getRowData",{rowIndxPage: ui.rowIndx});
	//             		 if(currentGetRowData.rowEditable == false){
	//             		 console.log(currentGetRowData);
	//             		 pqGrids.existingChargesGrid.$gridDiv.pqGrid("quitEditMode");
	// 	                 pqGrids.existingChargesGrid.$gridDiv.pqGrid("removeClass", { rowIndx: ui.rowIndx, cls: 'pq-row-edit' });
	// 	                 pqGrids.existingChargesGrid.$gridDiv.pqGrid("refreshRow", { rowIndx: ui.rowIndx });
	// 	             	 pqGrids.existingChargesGrid.addTooltip();
	// 	             	}else{
	// 	             		  pqGrids.existingChargesGrid.$gridDiv.pqGrid("addClass", { rowIndx: ui.rowIndx, cls: 'pq-row-edit' });
 //            				  pqGrids.existingChargesGrid.$gridDiv.pqGrid("editFirstCellInRow", { rowIndx: ui.rowIndx });
	// 	             	}
	//                 },
	//                 render:function(){
	//                 	console.log("refresh");
	//                 	//pqGrids.existingChargesGrid.addTooltip();
	//                 },
	//                 refreshRow: function( event, ui ) {
	//                 	console.log("refreshRow");
	//                 }

	//             });
				
	// 		existingGrid.on("pqgridcellbeforesave", function (evt, ui) {
	//             var isValid = existingGrid.pqGrid("isValid", ui).valid;
	//             if (!isValid) {
	//             	pqGrids.existingChargesGrid.savedSuccessfully = false;
	//             	pqGrids.existingChargesGrid.$gridDiv.find(".pq-editor-focus").css({ "border-color": "red" });
	//                 return false;
 //            		}
 //            	pqGrids.existingChargesGrid.savedSuccessfully = true;
 //            	return true;
 //        		});

	// 		 existingGrid.on("pqgridrefresh", function (evt, ui) {
 //                      pqGrids.existingChargesGrid.addTooltip();
 //                  });

	// 		 existingGrid.on("pqgrieditorfocus", function (evt, ui) {
	// 		 		console.log('focus start')
	// 		 })
	//         },
	//         fillGrid: function() {
	//             var datalength = this.data.length;

	//             for (var i = 0; i < datalength; i++) {
	//             	pqGrids.existingChargesGrid.data[i].index = i;
	//             }
	//         },
	//         addTooltip: function(){
	//         			var tableGridId = "#account_details_existing_charges_grid_table";

	//         			if(pqGrids.existingChargesGrid.isConfirmCharg)
	//         				tableGridId = "confirm_charge_existing_charges_grid_table";
               			 
 //               			 $(tableGridId).find('tr.pq-grid-row').each(function(){
                     
 //                                var rowIndex = parseInt($(this).attr('pq-row-indx'));
 //                                var rowData = pqGrids.existingChargesGrid.$gridDiv.pqGrid( "getRowData", {rowIndxPage: rowIndex} );
                         
 //                                if(rowData.rowEditable == false){
	//                                var content = '<b>Assigned to: </b>' + rowData.cenAuditorId+"<br/><b>Submitted on: </b>" + rowData.cenAuditingTime;
	//                          	   $(this).find('td').attr('data-toggle',"tooltip");
	//                                $(this).find('td').attr("title", content);
	//                                $('[data-toggle="tooltip"]').tooltip(); 
	//                             }
                    

 //                       })

 //               }

	//     },

	existingChargesGridCCI: {
	        gridDiv: "",
	        $gridDiv: {},
	        pagerDiv: "",
	        data: {},
	        onClick: {},
	        showPType:'',
	        savedSuccessfully: true,
	        isConfirmCharg:false,
	        isEditable:true,
	        initialize: function(param) {
	            log(param);
	            this.gridDiv = param.gridDiv;
	            this.$gridDiv = $(param.gridDiv);
	            this.pagerDiv = param.pagerDiv;
	            this.showPType = param.showPType;
	            this.isEditable = param.isEditable;
	            this.data = param.data;
	            this.onClick = param.onClick;
	            this.fillGrid();
	            this.loadGrid();
	            this.addTooltip();
	        },
	        reloadGrid: function() {
	            this.$gridDiv = $(this.gridDiv);
	            this.$gridDiv.pqGrid('destroy');
	            this.data = window["globalvars"]["assignedAccounts"];
	            this.$gridDiv = $(this.gridDiv);
	            this.fillGrid();
	            this.loadGrid();
	        },
	        formatCurrency:function(ui) {
            	var data = parseFloat(ui.cellData).toFixed(1);
            	 
            	  return (data < 0) ? "$(" + String(data.slice(1)).split("").reverse().join("")
                  .replace(/(\d{3}\B)/g, "$1,")
                  .split("").reverse().join("") + ")" : "$" + String(data).split("").reverse().join("")
                  .replace(/(\d{3}\B)/g, "$1,")
                  .split("").reverse().join("")
        	},
	        loadGrid: function() {
	        	this.savedSuccessfully = true;
	    		var existingGrid =  this.$gridDiv.pqGrid({
	                width: 1140,
	                height:250,
	                showTitle: false,            
	                columnBorders: false,
	                numberCell: false,
	                showBottom: false,
	                flexWidth: true,
	                columnBorders: true,
                    flexHeight: false,
	                wrap:false,
	                resizable: false,
	                hwrap:false,
	                scrollModel:{pace: 'fast', autoFit: false, theme: true },
	            		//pageModel: {type: "local", rPP:30, rPPOptions: [10, 20, 30, 50, 100], strRpp:"{0}", strDisplay:"{0} to {1} of {2}"},
	                filterModel: { on: true, mode: "AND", header: true },
	                dataModel: {
		        		data: this.data,
		        		sorting: "local"
		               // sortIndx: "hcpcCode",
		               // sortDir: "up"
		        			               
	                },
	    
	                editModel: {
		                saveKey: $.ui.keyCode.ENTER,
		                keyUpDown: true
		                //cellBorderWidth: 2
		               

	                },
	                editable: function (ui) {
		                var $grid = $(this);
		                var rowIndx = ui.rowIndx;
		                if (pqGrids.existingChargesGridCCI.$gridDiv.pqGrid("hasClass", { rowIndx: rowIndx, cls: 'pq-row-edit' }) == true) {
		                    return true;
		                }
		                else {
		                    return false;
		                }
		            },
	           
	            	
		                colModel: [
	                     {title: 'index', hidden: true, dataIndx:'index',editable: false},
	                    {title:globalvars.localResourceMap.existing_charge_hcpc_code, width: 80, dataIndx: 'hcpcCode',editable: false, align: "center",resizable: false,
	                							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
	                   	{title:globalvars.localResourceMap.existing_charge_dept_code, width: 80, dataIndx: 'dept',editable: false, align: "center",resizable:false	,				
	                   	filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
	                   	{title:'chargeNumber', width: 100, dataIndx: 'chargeNumber',hidden: true,editable: false, align: "center"},
	                    {title: globalvars.localResourceMap.existing_charge_charge_code,  width: 80, dataIndx: 'chargeCode', editable: false, align: "center",resizable: false,
							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},

						{title:globalvars.localResourceMap.existing_charge_unit, width: 70, dataIndx: 'quantity',editable: false, align: "center",
												filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
						{title:globalvars.localResourceMap.existing_charge_change_qty, width: 70, dataIndx: 'qty',dataType: "integer",editable: pqGrids.existingChargesGridCCI.isEditable, align: "center",cls:'pq-margin-int',
						// filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']},

						// editModel: { keyUpDown: true },
						// editor: { select: true },
						  editor: {
		                    type: "textbox"
		                //    select : true

		                   // init: autoCompleteEditor                    
		                },
						 // validations: [
						 // 			   // { type: 'maxLen', value: 3 ,msg: "Enter quantity can not be more than 3 digit"},
						 // 			   { type: function (ui) {
					  //                       var value = ui.value,
					  //                           _found = false;

					  //                       console.log(value);

					  //                       if(value.length > 3){
					  //                       	pqGrids.existingChargesGridCCI.savedSuccessfully = false;
					  //                           	ui.msg = "Enter quantity can not be more than 3 digit";
					  //                           return false;
					  //                       }else{
					  //                       	pqGrids.existingChargesGridCCI.savedSuccessfully = true;
					  //                       }
					                       	
					  //                       if (value == 0 && value != '') {
					  //                       	pqGrids.existingChargesGridCCI.savedSuccessfully = false;
					  //                           ui.msg = "Enter a non-zero quantity change in existing charges, or leave the row blank to make no change";
					  //                           return false;
					  //                       }else{
					  //                       	pqGrids.existingChargesGridCCI.savedSuccessfully = true;

					  //                       }
					  //                       return true;
					  //                   	}, icon: 'ui-icon-info'


       //              					}
						 // 			  ],
						editModel: { keyUpDown: true }
						},
						{title:globalvars.localResourceMap.existing_charge_amount, width: 100, dataIndx: 'chargeAmount', align: "right",editable: false,render: pqGrids.existingChargesGridCCI.formatCurrency,
												filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
						{title:globalvars.localResourceMap.existing_charge_charge_date, width: 80, dataIndx: 'chargeDate',editable: false,	 align: "center",						
							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
						// {title:'Rev Code', width: 60, dataIndx: 'revenueCode',editable: false, align: "center",
						// 						filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						// },
						{title:globalvars.localResourceMap.existing_charge_charge_description, width: 150, dataIndx: 'chargeDesc',fixed: true,editable: false, align:"center",resizable: false,
												filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
						{title:'Current Mod', width:80, dataIndx:'changeModifier',editable: false,align:"center"},
						{title:'Change Mod', width:80, dataIndx:'modifier',align:"center",editable: pqGrids.existingChargesGridCCI.isEditable,cls:'pq-margin-int'},
						{title:'Medicare Code', width:80, dataIndx:'medicareCode',editable: false,align:"center"},
						{title: 'isExist', index: 'isExist', hidden:true},
						{title:globalvars.localResourceMap.existing_charge_comment, width: 150, dataIndx: 'comments',editable: pqGrids.existingChargesGridCCI.isEditable,	align:"center",	cls:'pq-margin-int',				
						// filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']},

						editor: {
		                    type: "textbox"
		                   // init: autoCompleteEditor                    
		                },
		                editModel: { keyUpDown: true }

						},
						// // {title:'POST DATE', width: 70, dataIndx:'postDate',editable: false,	align:"center",						
						// filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						// },
						{title:'', width: 90, dataIndx:'predKey',hidden:true,editable: false},
						{title:'', width: 90, dataIndx:'rowEditable',hidden:true,editable: false},
						{title:'', width: 90, dataIndx:'cenAuditorId',hidden:true,editable: false},
						{title:'', width: 90, dataIndx:'cenAuditingTime',hidden:true,editable: false}
               ],
	                create: function(){
	                    var gridRowData = pqGrids.existingChargesGridCCI.$gridDiv.pqGrid( "option" , "dataModel.data" );
	                    if(gridRowData && gridRowData.length > 0){
		                    var gridRowDataLength = gridRowData.length;
		                    for (var i = 0; i < gridRowDataLength; i++) {
		                        if (gridRowData[i].rowEditable == false || gridRowData[i].rowEditable == "false") {
		                            //log("isHighlighted " + gridRowData[i].accountId + " : " + (i + 1));
		                            pqGrids.existingChargesGridCCI.$gridDiv.pqGrid("addClass", { rowIndx: i, cls: 'highlighted_row' } );
		                        }
		                        if (gridRowData[i].isExist == 'true' || gridRowData[i].isExist == true) {
		                        	pqGrids.existingChargesGridCCI.$gridDiv.pqGrid("addClass", { rowIndx: i, cls: 'highlighted_row_yellow' } );

		                        }
		                      
		                    }
		               
	                    }
	                   // pqGrids.existingChargesGridCCI.addTooltip();
	                },
	              //  rowClick: this.onClick,
	                cellSave: function( event, ui ) {
	                	console.log('tested ok cellSave');
	                	//pqGrids.existingChargesGridCCI.$gridDiv.pqGrid("refreshCell" ,{ rowIndx: ui.rowIndx});
	                },
	                cellSelect:function( event, ui ) {
	                	console.log('cell select');

	                },
	                cellBeforeSave:function( event, ui ) {
	                 	console.log('tested ok  cellBeforeSave');

	               //  	 var cd = ui.newVal;
			             // if (cd.length > 3) {
			             //    return false;
			             // }

			             // if(cd == 0)
			             // 	return false;

			             // return true;
	                },
	                editorFocus:function( event, ui ) {
	                	console.log("editorEnd");
	                	 pqGrids.existingChargesGridCCI.$gridDiv.pqGrid("saveEditCell" );
	                },
	                cellClick: function( event, ui ) {	
	                	var isValid = existingGrid.pqGrid("isValid", ui).valid;
	                	if(isValid)
	                		pqGrids.existingChargesGridCCI.$gridDiv.pqGrid("saveEditCell" );


	                	// console.log(isValid);
	                	//pqGrids.existingChargesGridCCI.$gridDiv.pqGrid( "editCell", { rowIndx: ui.rowIndx, dataIndx: 'qty' } );
	                	//pqGrids.existingChargesGridCCI.$gridDiv.pqGrid( "editCell", { rowIndx: ui.rowIndx, dataIndx: 'comments' } );
	                 
	                // pqGrids.existingChargesGridCCI.$gridDiv.pqGrid("addClass", { rowIndx: ui.rowIndx, cls: 'pq-row-edit' });
            		 //pqGrids.existingChargesGridCCI.$gridDiv.pqGrid("editFirstCellInRow", { rowIndx: ui.rowIndx });
            		 var currentGetRowData = pqGrids.existingChargesGridCCI.$gridDiv.pqGrid("getRowData",{rowIndxPage: ui.rowIndx});
	            		 if(currentGetRowData.rowEditable == false){
	            		 console.log(currentGetRowData);
	            		 pqGrids.existingChargesGridCCI.$gridDiv.pqGrid("quitEditMode");
		                 pqGrids.existingChargesGridCCI.$gridDiv.pqGrid("removeClass", { rowIndx: ui.rowIndx, cls: 'pq-row-edit' });
		                 pqGrids.existingChargesGridCCI.$gridDiv.pqGrid("refreshRow", { rowIndx: ui.rowIndx });
		             	 pqGrids.existingChargesGridCCI.addTooltip();
		             	}else{
		             		  pqGrids.existingChargesGridCCI.$gridDiv.pqGrid("addClass", { rowIndx: ui.rowIndx, cls: 'pq-row-edit' });
            				  pqGrids.existingChargesGridCCI.$gridDiv.pqGrid("editFirstCellInRow", { rowIndx: ui.rowIndx });
		             	}
	                },
	                render:function(){
	                	console.log("refresh");
	                	//pqGrids.existingChargesGridCCI.addTooltip();
	                },
	                refreshRow: function( event, ui ) {
	                	console.log("refreshRow");
	                }

	            });
				
			existingGrid.on("pqgridcellbeforesave", function (evt, ui) {
	            var isValid = existingGrid.pqGrid("isValid", ui).valid;
	            if (!isValid) {
	            	pqGrids.existingChargesGridCCI.savedSuccessfully = false;
	            	pqGrids.existingChargesGridCCI.$gridDiv.find(".pq-editor-focus").css({ "border-color": "red" });
	                return false;
            		}
            	pqGrids.existingChargesGridCCI.savedSuccessfully = true;
            	return true;
        		});

			 existingGrid.on("pqgridrefresh", function (evt, ui) {
                      pqGrids.existingChargesGridCCI.addTooltip();
                  });

			 existingGrid.on("pqgrieditorfocus", function (evt, ui) {
			 		console.log('focus start')
			 })
	        },
	        fillGrid: function() {
	            var datalength = this.data.length;

	            for (var i = 0; i < datalength; i++) {
	            	pqGrids.existingChargesGridCCI.data[i].index = i;
	            }
	        },
	        addTooltip: function(){
	        			var tableGridId = "#account_details_existing_charges_grid_table";

	        			if(pqGrids.existingChargesGridCCI.isConfirmCharg)
	        				tableGridId = "confirm_charge_existing_charges_grid_table";
               			 
               			 $(tableGridId).find('tr.pq-grid-row').each(function(){
                     
                                var rowIndex = parseInt($(this).attr('pq-row-indx'));
                                var rowData = pqGrids.existingChargesGridCCI.$gridDiv.pqGrid( "getRowData", {rowIndxPage: rowIndex} );
                         
                                if(rowData.rowEditable == false){
	                               var content = '<b>Assigned to: </b>' + rowData.cenAuditorId+"<br/><b>Submitted on: </b>" + rowData.cenAuditingTime;
	                         	   $(this).find('td').attr('data-toggle',"tooltip");
	                               $(this).find('td').attr("title", content);
	                               $('[data-toggle="tooltip"]').tooltip(); 
	                            }
                    

                       })

               }
            

	},

	subMenuPQgridGrid:{ // param object holds gridDiv, data
		gridDiv: "",
		$gridDiv:{},
		datalength:0,
		onClick:{},
		gridCreated: false,

		loadGrid: function(param) {
			
			if(param.data && param.data.length > 0){
	
				this.gridDiv = param.gridDiv;
				this.$gridDiv = $(param.gridDiv);
				this.datalength = param.data.length;
				this.onClick = param.onClick;
				this.showExcel = param.showExcel;
				this.$gridDiv.pqGrid({
					width: 1000,
					showTitle: false,            
					columnBorders: false,
					numberCell: false,
					showBottom: true,
					editable: false,
					flexWidth: false,
					columnBorders: true,
					flexHeight: true,
					scrollModel:{pace: 'fast', autoFit: true, theme: true },
					wrap:false,
					hwrap:true,
					resizable: false,
					collapsible: true,
					pageModel: {type: "local", rPP:40, rPPOptions: [10, 20, 30, 50, 100], strRpp:"{0}", strDisplay:"{0} to {1} of {2}"},
					filterModel: { on: true, mode: "AND", header: true },
					dataModel: {
						data: param.data,
						sorting: "local",
						sortIndx: "ruleId",
						sortDir: "up"
					},
					colModel: [
						{title: "ruleId", dataIndx: 'ruleId', width: 200, align: 'center', sortable: true
						},
						{title: "displayName", dataIndx: 'displayName', width: 200, sortable: true
						},
						{title:'ruleType', dataIndx: 'ruleType', width: 200, align: 'center', sortable: true,
						},
						{title: 'modifiedBy', dataIndx: 'modifiedBy', width: 200, align: 'center', sortable: true,
						},						
						{title:'active', dataIndx: 'active', width: 200, sortable: true,
							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						}
					   

				   ],
				   

				   create: function() {

					   var gridRowData = pqGrids.subMenuPQgridGrid.$gridDiv.pqGrid( "option" , "dataModel.data" );

					   if(gridRowData && gridRowData.length > 0){
							for (var i = 0; i < gridRowData.length; i++) {
								// if (gridRowData[i].found == "1") {
								//     log("Highlighted found" + gridRowData[i].acct + "::" + (i + 1));
								//     pqGrids.loadGlobalSearchGrid.$gridDiv.pqGrid("addClass", { rowIndx: i, cls: 'highlighted_row' } );
								//     //$(("tr#" + (i + 1))).addClass("highlighted_row");
								// }
							}
						}

	
						
						
						pqGrids.subMenuPQgridGrid.gridCreated = true;

					},


			 });

			}else{
				
							dialogs.messageDialog.show({text: "Data Not Available"});

			}

	  }

	},


	  existingChargesGrid: {
	        gridDiv: "",
	        $gridDiv: {},
	        pagerDiv: "",
	        data: {},
	        onClick: {},
	        showPType:'',
	        savedSuccessfully: true,
	        isConfirmCharg:false,
	        isEditable:true,
	        group:false,
	        initialize: function(param) {
	            log(param);
	            this.gridDiv = param.gridDiv;
	            this.$gridDiv = $(param.gridDiv);
	            this.pagerDiv = param.pagerDiv;
	            this.showPType = param.showPType;
	            this.isEditable = param.isEditable;
	            this.isConfirmCharg = param.isConfirmCharg;
	            this.group = param.group;
	            this.data = param.data;
	            this.onClick = param.onClick;
	            this.fillGrid();
	            this.loadGrid();
	            this.addTooltip();
	           // this.addSummaryValidation();
	           	// this.addCollapseEvent();
             //    this.addExpandEvent();
             //    this.addExpandCollapseRowEvent();
                //this.toggleGrouping();
	        },
	        reloadGrid: function() {
	            this.$gridDiv = $(this.gridDiv);
	            this.$gridDiv.pqGrid('destroy');
	            this.data = window["globalvars"]["assignedAccounts"];
	            this.$gridDiv = $(this.gridDiv);
	            this.fillGrid();
	            this.loadGrid();
	        },
	        formatCurrency:function(ui) {
            	var data = parseFloat(ui.cellData).toFixed(1);
            	 
            	  return (data < 0) ? "$(" + String(data.slice(1)).split("").reverse().join("")
                  .replace(/(\d{3}\B)/g, "$1,")
                  .split("").reverse().join("") + ")" : "$" + String(data).split("").reverse().join("")
                  .replace(/(\d{3}\B)/g, "$1,")
                  .split("").reverse().join("")

           	},
	        loadGrid: function() {
	        	this.savedSuccessfully = true;
	    		var existingGrid =  this.$gridDiv.pqGrid({
	                width: 1145,
	                height:250,
	                showTitle: false,            
	                columnBorders: false,
	                numberCell: false,
	                showBottom: false,
	                flexWidth: false,
	                columnBorders: true,
                    flexHeight: false,
	                wrap:false,
	                resizable: false,
	                hwrap:true,
	                virtualX: true,
            		virtualY: true,
	                scrollModel:{pace: 'fast', autoFit: false, theme: true },
	            		//pageModel: {type: "local", rPP:30, rPPOptions: [10, 20, 30, 50, 100], strRpp:"{0}", strDisplay:"{0} to {1} of {2}"},
	                filterModel: { on: true, mode: "AND", header: true },
	                dataModel: {
		        		data: this.data,
		        		sorting: "local",
		                sortIndx: "hcpcCode",
		                sortDir: "down"
		        			               
	                },
	                
	    
	                editModel: {
		                saveKey: $.ui.keyCode.ENTER,
		                keyUpDown: true,
		                cellBorderWidth: 0,
						onBlur: 'validate',
						select: true
	                },
	                editable: function (ui) {
		                var $grid = $(this);
		                var rowIndx = ui.rowIndx;
		                if (pqGrids.existingChargesGrid.$gridDiv.pqGrid("hasClass", { rowIndx: rowIndx, cls: 'pq-row-edit' }) == true) {
		                    return true;
		                }
		                else {
		                    return false;
		                }
		            },
	           
	            	
		                colModel: [
	                     {title: 'index', hidden: true, dataIndx:'index',editable: false},
	                    {title:globalvars.localResourceMap.existing_charge_hcpc_code, width: 90, dataIndx: 'hcpcCode',editable: false, align: "center",
	                							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
	                   	{title:globalvars.localResourceMap.existing_charge_dept_code, width: 90, dataIndx: 'dept',editable: false, align: "center"					
	                   	// filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
	                   	{title:'chargeNumber', width: 10, dataIndx: 'chargeNumber',hidden: true,editable: false, align: "center"},
	                    {title: globalvars.localResourceMap.existing_charge_charge_code,  width: 110, dataIndx: 'chargeCode', editable: false, align: "center",
							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
						{title: 'NDC Code',  width: 80, dataIndx: 'ndcCode', editable: false, align: "center", hidden: (globalvars.client=="MERCY")?false:true,
							filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},

						{title:globalvars.localResourceMap.existing_charge_unit, width: 60, dataIndx: 'quantity',editable: false, align: "center",
												filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
												//summary:{type:["sum"],title:["Total: {0}"]} 
						},
						{title:globalvars.localResourceMap.existing_charge_change_qty, width: 70, dataIndx: 'qty',dataType:"integer",editable: pqGrids.existingChargesGrid.isEditable, align: "center",
						// filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']},

						 editor: {
		                    type: "textbox"
		                   // init: autoCompleteEditor                    
		                },
		                editModel: { keyUpDown: true }


		                   // init: autoCompleteEditor                    
		                //},
		                 // validations: [
                   //          { type: 'maxLen', value: 3, msg: "length should be <= 3" }
                   //      ],
						 //validations: [
						 	//		   { type: 'maxLen', value: '3',msg:"Enter quantity can not be more than 3 digit"}
						 			   // { type: function (ui) {
					        //                 var value = ui.value,
					        //                     _found = false;

					        //               //  console.log(value);

					        //                 if(value.length > 3){
					        //                 	pqGrids.existingChargesGrid.savedSuccessfully = false;
					        //                     	ui.msg = "Enter quantity can not be more than 3 digit in existing charges.";
					        //                     return false;
					        //                 }else{
					        //                 	pqGrids.existingChargesGrid.savedSuccessfully = true;
					        //                 }
					                       	
					        //                 if (value == 0 && value != '') {
					        //                 	pqGrids.existingChargesGrid.savedSuccessfully = false;
					        //                     ui.msg = "Enter a non-zero quantity change in existing charges, or leave the row blank to make no change";
					        //                     return false;
					        //                 }else{
					        //                 	pqGrids.existingChargesGrid.savedSuccessfully = true;

					        //                 }
					        //                 return true;
					        //             	}, icon: 'ui-icon-info'


             //        					}
						 	//		  ],
						//editModel: { keyUpDown: true }//,summary:{type:["sum"],title:["Total: {0}"]}
						},
						{title:globalvars.localResourceMap.existing_charge_amount, width: 65, dataIndx: 'chargeAmount', fixed: true, align: "right",editable: false,render: pqGrids.existingChargesGrid.formatCurrency,cls:'pq-margin-int',
												filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
												//summary:{type:["sum"],title:["Total: {0}"]}
						},
						{title:globalvars.localResourceMap.existing_charge_charge_date, width: 70, dataIndx: 'chargeDate',editable: false,	 align: "center"						
							// filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
						{title:'Rev Code', width: 60, dataIndx: 'revenueCode',editable: false, align: "center"
												// filter: {type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
						{title:globalvars.localResourceMap.existing_charge_charge_description,  width: (globalvars.client=="MERCY")?200:280, dataIndx: 'chargeDesc',editable: false, align:"center",
												filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
						{title:'', width:80, dataIndx:'modifier',hidden:true,editable: false},
						{title:'', width:80, dataIndx:'changeModifier',hidden:true,editable: false},
						{title:'', width:80, dataIndx:'medicareCode',hidden:true,editable: false},
						{title:globalvars.localResourceMap.existing_charge_comment, width: 120, dataIndx: 'comments',editable: pqGrids.existingChargesGrid.isEditable,	align:"center",					
						// filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']},

						editor: {
		                    type: "textbox"
		                   // init: autoCompleteEditor                    
		                },
		                editModel: { keyUpDown: true }

						},
						{title:'POST DATE', width: 80, dataIndx:'postDate',editable: false,	align:"center",						
						filter: { type: 'textbox', attr: 'placeholder="Search..."', condition: "contain", listeners: ['keyup']}
						},
						{title:'', width: 90, dataIndx:'predKey',hidden:true,editable: false},
						{title:'', width: 90, dataIndx:'rowEditable',hidden:true,editable: false},
						{title:'', width: 90, dataIndx:'cenAuditorId',hidden:true,editable: false},
						{title:'', width: 90, dataIndx:'cenAuditingTime',hidden:true,editable: false},
						{title:'', width: 90, dataIndx:'chargeGroupKey',hidden:true,editable: false},
						{title:'', width: 90, dataIndx:'hasMultipleChilds',hidden:true,editable: false},
						

               ],
	                create: function(){
	                    var gridRowData = pqGrids.existingChargesGrid.$gridDiv.pqGrid( "option" , "dataModel.data" );
	                    if(gridRowData && gridRowData.length > 0){
		                    var gridRowDataLength = gridRowData.length;
		                    for (var i = 0; i < gridRowDataLength; i++) {
		                        if ((gridRowData[i].rowEditable == false && pqGrids.existingChargesGrid.isEditable == true)||(gridRowData[i].rowEditable == false && pqGrids.existingChargesGrid.isEditable == false && pqGrids.existingChargesGrid.isConfirmCharg==true && pqGrids.existingChargesGrid.group==false)) {
		                            //log("isHighlighted " + gridRowData[i].accountId + " : " + (i + 1));
		                            pqGrids.existingChargesGrid.$gridDiv.pqGrid("addClass", { rowIndx: i, cls: 'highlighted_row' } );
		                        }

		                        if((pqGrids.existingChargesGrid.isEditable == false && pqGrids.existingChargesGrid.isConfirmCharg==false) || (pqGrids.existingChargesGrid.isConfirmCharg==true && pqGrids.existingChargesGrid.group==true)){

			                        if(gridRowData[i].hasMultipleChilds == true){
			                      		pqGrids.existingChargesGrid.$gridDiv.pqGrid("addClass", { rowIndx: i, cls: 'existingMultipleChild' } );
			                        }
			                    }
		                      
		                    }
		               
	                    }
	                   // pqGrids.existingChargesGrid.addTooltip();
	                },
	                cellSave: function( event, ui ) {
	                //	console.log('tested ok cellSave');
	                	//pqGrids.existingChargesGrid.$gridDiv.pqGrid("refreshCell" ,{ rowIndx: ui.rowIndx});
	                },
	                beforeRowExpand:function( event, ui ) {
	                //	console.log('beforeRowExpand');

	                },
	                cellBeforeSave:function( event, ui ) {
	      
	                },
	                editorFocus:function( event, ui ) {
	               // 	console.log("editorFocus");
	                	 pqGrids.existingChargesGrid.$gridDiv.pqGrid("saveEditCell" );
	                },
	                rowUnSelect:function( event, ui ) {
	              //  	console.log('row rowUnSelect');
	                },
	                cellClick: function( event, ui ) {
	                	//console.log('row rowSelect');	
	                	//console.log(ui);	

	                	if(pqGrids.existingChargesGrid.isEditable == false && pqGrids.existingChargesGrid.isConfirmCharg==false){
	                		if(ui.colIndx == 7){
	                			dialogs.messageDialog.show({text:'Switch to Detailed view to edit charge quantity.'});
		                		return false;
	                		}
	                	}

	                	var isValid = existingGrid.pqGrid("isValid", ui).valid;
	                	if(isValid)
	                		pqGrids.existingChargesGrid.$gridDiv.pqGrid("saveEditCell" );

            		 var currentGetRowData = pqGrids.existingChargesGrid.$gridDiv.pqGrid("getRowData",{rowIndxPage: ui.rowIndx});
	            		 if(currentGetRowData.rowEditable == false && pqGrids.existingChargesGrid.isEditable == true){
	            		// console.log(currentGetRowData);
	            		 pqGrids.existingChargesGrid.$gridDiv.pqGrid("quitEditMode");
		                 pqGrids.existingChargesGrid.$gridDiv.pqGrid("removeClass", { rowIndx: ui.rowIndx, cls: 'pq-row-edit' });
		                 pqGrids.existingChargesGrid.$gridDiv.pqGrid("refreshRow", { rowIndx: ui.rowIndx });
		             	 pqGrids.existingChargesGrid.addTooltip();
		      
		             	}else{
		             		  pqGrids.existingChargesGrid.$gridDiv.pqGrid("addClass", { rowIndx: ui.rowIndx, cls: 'pq-row-edit' });
            				  pqGrids.existingChargesGrid.$gridDiv.pqGrid("editFirstCellInRow", { rowIndx: ui.rowIndx });
		             	}
	                },
	                render:function(){
	                	console.log("render");
	                },
	                scrollModel:{
	                	autoFit: true
	                },
	                refreshRow: function( event, ui ) {
	                //	console.log("refreshRow");
	                }
	                

	            });
				
			existingGrid.on("pqgridcellbeforesave", function (evt, ui) {
	            var isValid = existingGrid.pqGrid("isValid", ui).valid;
	            if (!isValid) {
	            	pqGrids.existingChargesGrid.savedSuccessfully = false;
	            	pqGrids.existingChargesGrid.$gridDiv.find(".pq-editor-focus").css({ "border-color": "red" });
	                return false;
            		}
            	pqGrids.existingChargesGrid.savedSuccessfully = true;
            	return true;
        		});

			

			 existingGrid.on("pqgridrefresh", function (evt, ui) {
                      pqGrids.existingChargesGrid.addTooltip();
             });

			 existingGrid.on("pqscrollbarscroll", function (evt, ui) {
			 	//console.log('test');	
			 	pqGrids.existingChargesGrid.$gridDiv.pqGrid("saveEditCell" );


			 });


			 existingGrid.on("pqgrieditorfocus", function (evt, ui) {
			 		//console.log('focus start');
			 });

			 existingGrid.on( "pqgridbeforerowexpand", function( event, ui ) {
			 	//console.log('pqgridbeforerowexpand');
			 });

			 existingGrid.find('span.ui-icon-minus').on( "click", function(event) {
			 	//console.log('click minus');
			 });

	        },
	        fillGrid: function() {
	            var datalength = this.data.length;

	            for (var i = 0; i < datalength; i++) {
	            	pqGrids.existingChargesGrid.data[i].index = i;
	            }
	        },
	       
	        addTooltip: function(){
	        			var tableGridId = "#account_details_existing_charges_grid_table";

	        			if(pqGrids.existingChargesGrid.isConfirmCharg)
	        				tableGridId = "#confirm_charge_existing_charges_grid_table";

               			 
               			 $(tableGridId).find('tr.pq-grid-row').each(function(){
                     
                                var rowIndex = parseInt($(this).attr('pq-row-indx'));
                                var rowData = pqGrids.existingChargesGrid.$gridDiv.pqGrid( "getRowData", {rowIndxPage: rowIndex} );
                         
                                if((rowData.rowEditable == false && pqGrids.existingChargesGrid.isEditable==true) || (rowData.rowEditable == false && pqGrids.existingChargesGrid.isEditable==false && pqGrids.existingChargesGrid.isConfirmCharg == true && pqGrids.existingChargesGrid.group==false)){
	                               var content = '<b>Assigned to: </b>' + rowData.cenAuditorId+"<br/><b>Submitted on: </b>" + rowData.cenAuditingTime;
	                         	   $(this).find('td').attr('data-toggle',"tooltip");
	                               $(this).find('td').attr("title", content);
	                               $('[data-toggle="tooltip"]').tooltip(); 
	                            }
                    

                       })

               }
      

	    }
	    
	    
};
