/*******************************************************************************
 * A function that creates a new figure based upon the specified number
 * 
 * @param { figNum } - The figure that you wish to create.
 * @param { mode } - True if inserting figures and false if inserting an editor.
 *******************************************************************************/
var Figure = function(figNum, figureMode) {
	this.figNum = figNum;
	this.figureMode = figureMode;
	var editorDivID;
	var cantEdit;
	if(this.figureMode){
		editorDivID = "fig" + this.figNum + "Div";
		cantEdit = true;
	} else {
		editorDivID = "editor" + this.figNum;
		cantEdit = false;
	}
	
	this.codeID = "code"+editorDivID;
	
	var self = this;
	
	this.htmlString = "<div ng-controller='assemblycontroller"+this.figNum+"' class='container' id='fig"+this.figNum+"'>\
	<div class='row'>\
\
		<div id='"+this.codeID+"' style='width:100%; height:250px; overflow-y:auto;'></div>\
		<br>\
		<div class='text-center'>\
				<div class='btn-group-horizontal'>\
					<button id='runButton' type='button' ng-class='buttonColor(runText)' ng-click='runButton()' ng-bind='runText'></button>\
					<button id='walkButton' type='button' ng-class='buttonColor(walkText)' ng-click='walkButton()' ng-bind='walkText'></button>\
				</div>\
			</div>\
			<br>\
			<!-- begining of the tabs -->\
			<tabset class='col-lg-9'> <!-- demo tab - shows all of the information for the current lab -->\
			<tab heading='Figure'> <br>\
			<div class='container'>\
				<div class='row'>\
					<div class='col-lg-2 col-md-2 col-sm-2 col-xs-3'>\
						<div id='table'>\
							<table id='variables"+this.figNum+"' class='table table-bordered'>\
								<thead>\
									<tr>\
										<th colspan='2' class='text-center'>Memory</th>\
									</tr>\
								</thead>\
								<tbody ng-repeat='mem in varMemory'>\
									<tr>\
										<th ng-bind='mem.title'></th>\
										<td class='text-center' ng-bind='mem.value'></td>\
									</tr>\
								</tbody>\
							</table>\
						</div>\
					</div>\
					<div class='col-lg-2 col-md-2 col-sm-2 col-xs-3' style='margin-left:4%'>\
						<div id='table'>\
							<table id='variables' class='table table-bordered'>\
								<thead>\
									<tr>\
										<th colspan='2' class='text-center'>Register</th>\
									</tr>\
								</thead>\
								<tbody ng-repeat='reg in varRegister'>\
									<tr>\
										<th ng-bind='reg.title'></th>\
										<td class='text-center' ng-bind='reg.value'></td>\
									</tr>\
								</tbody>\
							</table>\
						</div>\
					</div>\
				</div>\
			</div>\
			</tab>\
\
			<tab heading='Editor' disabled='"+cantEdit+"'> <br>\
			<div class='container'>\
				<div class='row'>\
\
					<!-- button group for the table and code -->\
					<!-- <table id='btn-grid' class='col-lg-6 col-md-6'> -->\
					<table id='btn-grid'>\
						<tbody>\
							<tr id='editor_button_group' class='btn-group-vertical'>\
								<td type='button' class='btn btn-default' onclick='word(editor"+this.figNum+")'>.WORD</td>\
								<td type='button' class='btn btn-default' onclick='load(editor"+this.figNum+")'>LOAD</td>\
								<td type='button' class='btn btn-default' onclick='store(editor"+this.figNum+")'>STORE</td>\
								<td type='button' class='btn btn-default' onclick='add(editor"+this.figNum+")'>ADD</td>\
								<td type='button' class='btn btn-default' onclick='asl(editor"+this.figNum+")'>ASL</td>\
								<td type='button' class='btn btn-default' onclick='compare(editor"+this.figNum+")'>COMPARE</td>\
							</tr>\
							<tr id='editor_button_group' class='btn-group-vertical'>\
								<td type='button' class='btn btn-default' onclick='block(editor"+this.figNum+")'>.BLOCK</td>\
								<td type='button' class='btn btn-default' onclick='loadIMM(editor"+this.figNum+")'>LOADIMM</td>\
								<td type='button' class='btn btn-default' onclick='storeIND(editor"+this.figNum+")'>STOREIND</td>\
								<td type='button' class='btn btn-default' onclick='subtract(editor"+this.figNum+")'>SUBTRACT</td>\
								<td type='button' class='btn btn-default' onclick='asr(editor"+this.figNum+")'>ASR</td>\
								<td type='button' class='btn btn-default' onclick='branch(editor"+this.figNum+")'>BRANCH</td>\
							</tr>\
							<tr id='editor_button_group' class='btn-group-vertical'>\
								<td type='button' class='btn btn-default' onclick='halt(editor"+this.figNum+")'>HALT</td>\
								<td type='button' class='btn btn-default' onclick='loadIND(editor"+this.figNum+")'>LOADIND</td>\
								<td type='button' class='btn btn-default' onclick='and(editor"+this.figNum+")'>AND</td>\
								<td type='button' class='btn btn-default' onclick='or(editor"+this.figNum+")'>OR</td>\
								<td type='button' class='btn btn-default' onclick='not(editor"+this.figNum+")'>NOT</td>\
								<td type='button' class='btn btn-default' onclick='jump(editor"+this.figNum+")'>JUMP</td>\
							</tr>\
						</tbody>\
					</table>\
				</div>\
			</div>\
			</tab>\
			<!-- tab containing the memory, register, program counters, and flags -->\
			<tab heading='Architecture'> <br>\
			<div class='container'>\
				<div id='memory' class='col-lg-3 col-md-3 col-sm-3 col-xs-4 panel panel-default'>\
					<h4 class='text-center'>Memory</h4>\
					<div id='spanMemWrapper'>\
						<div id='spanVarMem' >\
							<table class='table table-bordered' ng-repeat='var in vars' style='table-layout: fixed;'>\
								<tr ng-style='set_color(var.memno)'>\
									<th ng-bind='var.memno'></th>\
									<td ng-bind='var.con1'></td>\
									<td ng-bind='var.con2'></td>\
									<td ng-bind='var.con3'></td>\
									<td ng-bind='var.con4'></td>\
								</tr>\
							</table>\
						</div>\
						<div id='spanMem'>\
							<table class='table table-bordered' ng-repeat='mem in memory' style='table-layout: fixed;'>\
								<tr ng-style='set_color(mem.memno)'>\
									<th ng-bind='mem.memno'></th>\
									<td ng-bind='mem.con1'></td>\
									<td ng-bind='mem.con2'></td>\
									<td ng-bind='mem.con3'></td>\
									<td ng-bind='mem.con4'></td>\
								</tr>\
							</table>\
						</div>\
					</div>\
				</div>\
				<div id='bus'>Data Bus</div>\
				<div id='cpu' class='col-lg-6 col-md-6 col-sm-6 col-xs-6 panel panel-default'>\
				<h3 class='text-center'>CPU</h3>\
					<div class='panel panel-default' style='width: 100%;'>\
						<!-- table containing the register information -->\
						<div id='registers' class='col-lg-4  col-md-4 col-sm-4 col-xs-6'>\
							<h4>Registers</h4>\
							<!-- I should be outside of this box -->\
							<div id='spanReg'>\
								<table class='table table-bordered' style='table-layout:auto;' ng-repeat='reg in register'>\
									<tbody>\
										<tr>\
											<th class='text-center' ng-bind='reg.content'></th>\
											<td class='text-center' ng-bind='reg.value'></td>\
										</tr>\
									</tbody>\
								</table>\
							</div>\
						</div>\
						<!-- program counter and instruction register table -->\
						<div id='counter-flags' class='col-lg-2 col-md-2 col-sm-4 col-xs-6'>\
							<table class='table table-bordered'>\
								<tbody>\
									<tr>\
										<th class='text-center' colspan='4'>Program Counter</th>\
									</tr>\
									<tr>\
										<td class='text-center' colspan='4' ng-repeat='cnt in counter' ng-bind='cnt.content'></td>\
									</tr>\
									<tr>\
										<th class='text-center' colspan='4'>Instruction Register</th>\
									</tr>\
									<tr ng-repeat='inst in instructionRegister' class='text-center'>\
										<td ng-bind='inst.con1'></td>\
										<td ng-bind='inst.con2'></td>\
										<td ng-bind='inst.con3'></td>\
										<td ng-bind='inst.con4'></td>\
									<tr>\
								</tbody>\
							</table>\
							<!-- flag table -->\
							<table class='table table-bordered'>\
								<thead>\
									<tr>\
										<th colspan='2' class='text-center'>Flags</th>\
									</tr>\
								</thead>\
								<tbody>\
								<tr>\
									<td><strong>Carry</strong></td>\
									<td class='text-center' ng-repeat='carry in carryFlag' ng-bind='carry.flag'></td>\
								</tr>\
								<tr>\
									<td><strong>Negative</strong></td>\
									<td class='text-center' ng-repeat='neg in negativeFlag' ng-bind='neg.flag'></td>\
								</tr>\
								<tr>\
									<td><strong>Zero</strong></td>\
									<td class='text-center' ng-repeat='zero in zeroFlag' ng-bind='zero.flag'></td>\
								</tr>\
								<tr>\
									<td><strong>Overflow</strong></td>\
									<td class='text-center' ng-repeat='over in overflowFlag' ng-bind='over.flag'></td>\
								</tr>\
								</tbody>\
							</table>\
						</div>\
					</div>\
				</div>\
			</div>\
			</tab></tabset>\
			<br>\
		</div>\
	</div>";
	var divName = document.getElementById(editorDivID);
	divName.innerHTML = this.htmlString;
	
	
	var len = 0;
	var memPointer = 0;
	var clickedCell;
	var clickedCellNum;
	var deleteFlag = false;
	var registers = ["REG0", "REG1", "REG2", "REG3",
			"REG4", "REG5", "REG6", "REG7",
			"REG8", "REG9", "REGA", "REGB", 
			"REGC", "REGD", "REGE", "REGF"];
	var conditions = ["EQ", "NE", "LT", "LE", "GT", "GE", "CARRY", "NEG", "ZERO", "OVER"];
	var labels = [];
	var editor1 = new Editor(this.codeID, true, true, 1, 50, true);
	var editorDiv = document.getElementById(this.codeID);
	var deleteCell;
	var edited;

	this.word = function(){
		editor1.addRow(memPointer,
				[{text:"&lt;label&gt;", type:"label1"},
				{text:".WORD", type:"keyword"},
				{text:"&lt;const&gt;", type:"constant const1"}]);
		memPointer++;
		edited = true;
		console.log(".WORD pressed for "+this.figNum);
	};
	
	this.block = function(){
		editor1.addRow(memPointer,
				[{text:"&lt;label&gt;", type:"label1"},
				{text:".BLOCK", type:"keyword"},
				{text:"&lt;const&gt;", type:"constant const1"}]);
		memPointer++;
		edited = true;
		console.log(".BLOCK pressed for "+this.figNum);
	};
	
	this.loadIMM = function(){
		editor1.addRow(editor1.getSelectedRowIndex(),
				[{text:"&nbsp;", type:"label1"},
				{text:"LOADIMM", type:"command"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;const&gt;", type:"constant const2"}]);
		edited = true;
		console.log("LOADIMM pressed for "+this.figNum);
	};
	
	this.load = function(){
		editor1.addRow(editor1.getSelectedRowIndex(),
				[{text:"&nbsp;", type:"label1"},
				{text:"LOAD", type:"command"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;label&gt;", type:"label2"}]);
		edited = true;
		console.log("LOAD pressed for "+this.figNum);
	};
	
	this.store = function(){
		editor1.addRow(editor1.getSelectedRowIndex(),
				[{text:"&nbsp;", type:"label1"},
				{text:"STORE", type:"command"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;label&gt;", type:"label2"}]);
		edited = true;
		console.log("STORE pressed for "+this.figNum);
	};
	
	this.loadIND = function(){
		editor1.addRow(editor1.getSelectedRowIndex(),
				[{text:"&nbsp;", type:"label1"},
				{text:"LOADIND", type:"command"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;reg&gt;", type:"reg2"}]);
		edited = true;
		console.log("LOADIND pressed for "+this.figNum);
	};
	
	this.storeIND = function(){
		editor1.addRow(editor1.getSelectedRowIndex(),
				[{text:"&nbsp;", type:"label1"},
				{text:"STOREIND", type:"command"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;reg&gt;", type:"reg2"}]);
		edited = true;
		console.log("STOREIND pressed for "+this.figNum);
	};
	
	this.add = function(){
		editor1.addRow(editor1.getSelectedRowIndex(),
				[{text:"&nbsp;", type:"label1"},
				{text:"ADD", type:"command"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;reg&gt;", type:"reg2"}]);
		edited = true;
		console.log("ADD pressed for "+this.figNum);
	};
	
	this.subtract = function(){
		editor1.addRow(editor1.getSelectedRowIndex(),
				[{text:"&nbsp;", type:"label1"},
				{text:"SUBTRACT", type:"command"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;reg&gt;", type:"reg2"}]);
		edited = true;
		console.log("SUBTRACT pressed for "+this.figNum);
	};
	
	this.and = function(){
		editor1.addRow(editor1.getSelectedRowIndex(),
				[{text:"&nbsp;", type:"label1"},
				{text:"AND", type:"command"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;reg&gt;", type:"reg2"}]);
		edited = true;
		console.log("AND pressed for "+this.figNum);
	};
	
	this.or = function(){
		editor1.addRow(editor1.getSelectedRowIndex(),
				[{text:"&nbsp;", type:"label1"},
				{text:"OR", type:"command"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;reg&gt;", type:"reg2"}]);
		edited = true;
		console.log("OR pressed for "+this.figNum);
	};
	
	this.not = function(){
		editor1.addRow(editor1.getSelectedRowIndex(),
				[{text:"&nbsp;", type:"label1"},
				{text:"NOT", type:"command"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;reg&gt;", type:"reg2"}]);
		edited = true;
		console.log("NOT pressed for "+this.figNum);
	};
	
	this.asl = function(){
		editor1.addRow(editor1.getSelectedRowIndex(),
				[{text:"&nbsp;", type:"label1"},
				{text:"ASL", type:"command"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;bits&gt;", type:"constant bits"}]);
		edited = true;
		console.log("ASL pressed for "+this.figNum);
	};
	
	this.asr = function(){
		editor1.addRow(editor1.getSelectedRowIndex(),
				[{text:"&nbsp;", type:"label1"},
				{text:"ASR", type:"command"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;bits&gt;", type:"constant bits"}]);
		edited = true;
		console.log("ASL pressed for "+this.figNum);
	};
	
	this.compare = function(){
		editor1.addRow(editor1.getSelectedRowIndex(),
				[{text:"&nbsp;", type:"label1"},
				{text:"COMPARE", type:"command"},
				{text:"&lt;reg&gt;,", type:"reg1"},
				{text:"&lt;reg&gt;", type:"reg2"}]);
		edited = true;
		console.log("COMPARE pressed for "+this.figNum);
	};
	
	this.branch = function(){
		editor1.addRow(editor1.getSelectedRowIndex(),
				[{text:"&nbsp;", type:"label1"},
				{text:"BRANCH", type:"command"},
				{text:"&lt;cond&gt;,", type:"cond"},
				{text:"&lt;label&gt;"}]);
		edited = true;
		console.log("BRANCH pressed for "+this.figNum);
	};
	
	this.jump = function(){
		editor1.addRow(editor1.getSelectedRowIndex(),
				[{text:"&nbsp;", type:"label1"},
				{text:"JUMP", type:"command"},
				{text:"&lt;label&gt;", type:"label2"}]);
		edited = true;
		console.log("JUMP pressed for "+this.figNum);
	};
	
	this.halt = function(){
		editor1.addRow(editor1.getSelectedRowIndex(),
				[{text:"&nbsp;", type:"label1"},
				{text:"HALT", type:"command"}]);
		edited = true;
	};
	
	
	//var insertWord = document.getElementById("word"+this.figNum);
	//insertWord.onclick = function(){console.log("Yo");};
	
	//var insertBlock = document.getElementById("block"+this.figNum);
	//insertBlock.onclick = this.block;
	
	//var insertHalt = document.getElementById("halt"+this.figNum);
	//insertHalt.onclick = this.halt;
	
	//var insertLoad = document.getElementById("load"+this.figNum);
	//insertLoad.onclick = this.load;
	
	//var insertLoadIMM = document.getElementById("loadimm"+this.figNum);
	//insertLoadIMM.onclick = this.loadIMM;
	
	//var insertLoadIND = document.getElementById("loadind"+this.figNum);
	//insertLoadIND.onclick = this.loadIND;
	
	//var insertStore = document.getElementById("store"+this.figNum);
	//insertStore.onclick = this.store;
	
	//var insertStoreIND = document.getElementById("storeind"+this.figNum);
	//insertStoreIND.onclick = this.storeIND;
	
	//var insertAnd = document.getElementById("and"+this.figNum);
	//insertAnd.onclick = this.and;
	
	//var insertAdd = document.getElementById("add"+this.figNum);
	//insertAdd.onclick = this.add;
	
	//var insertSubtract = document.getElementById("subtract"+this.figNum);
	//insertSubtract.onclick = this.subtract;
	
	//var insertOr = document.getElementById("or"+this.figNum);
	//insertOr.onclick = this.or;
	
	//var insertASL = document.getElementById("asl"+this.figNum);
	//insertASL.onclick = this.asl;
	
	//var insertASR = document.getElementById("asr"+this.figNum);
	//insertASR.onclick = this.asr;
	
	//var insertNot = document.getElementById("not"+this.figNum);
	//insertNot.onclick = this.not;
	
	//var insertCompare = document.getElementById("compare"+this.figNum);
	//insertCompare.onclick = this.compare;
	
	//var insertBranch = document.getElementById("branch"+this.figNum);
	//insertBranch.onclick = this.branch;
	
	//var insertJump = document.getElementById("jump"+this.figNum);
	//insertJump.onclick = this.jump;
	
	/* Selector for the available <label>'s */
    function createLabelSelector(title, optionS, callback) {
        var newSel = new Selector();
        newSel.open(title, optionS, callback);
    }
    
    /* Selector for the <reg>, and <reg>'s */
    function createRegSelector(title, optionS, callback) {
        var newSel = new Selector();
        newSel.open(title, optionS, callback);
    }
    
    /* Selector for the <cond>, elements */
    function createCondSelector(title, optionS, callback) {
        var newSel = new Selector();
        newSel.open(title, optionS, callback);
    }
    
    /* String Pad for <label> elements on the left of the program */
    function createLabelMaker(title, instructions, callback) {
        var newStrP = new StringPad();
        newStrP.open(title, instructions, callback);
    }
    
    /* Number Pad for the <bits> element */
    function createNumBitsPad(minValue, maxValue, titleStr, instructions, decimalAllowed, base, callback) {
		var newNumpad = new NumberPad();
		newNumpad.open(minValue, maxValue, titleStr, instructions, decimalAllowed, base, callback);
    }
    
    /* Number Pad for the <const> element */
    function createConstNumPad(minValue, maxValue, titleStr, instructions, decimalAllowed, base, callback) {
		var newNumpad = new NumberPad();
		newNumpad.open(minValue, maxValue, titleStr, instructions, decimalAllowed, base, callback);
    }

    /* Requisite Alert Box */
    function createAlertBox(title, msg, bool, callback) {
        var alert = new Alert();
        alert.open(title, msg, bool, callback);
    }
    
    function fReturn(result) {
        //Function that is called when selecting a function that replaces the text of a single cell
    	if(result != null){
    		clickedCell.text(result);
    		edited = true;
    	}
    }
    
    function fDelete(result) {
    	deleteFlag = result;
    	if(deleteFlag){
			if($(this).parent().parent().parent().parent().parent().index() <= memPointer){
				memPointer--;
			}
			editor1.deleteRow(deleteCell);
			console.log("Post-Deletion memPointer = "+memPointer);
			edited = true;
		}
    }
    
    function fReturnC(result) {
    	//Function that returns results padded with a comma ','
    	if(result != null){
    		clickedCell.text(result + ',');
    		edited = true;
    	}
    }
    
    function fRegister(result) {
    	//Function that stores the simple register
    	if(result != null) {
    		clickedCell.text(result);
    		edited = true;
    	}
    }
    
    function fRegisterC(result) {
    	//Function that stores the register and a comma
    	if(result != null) {
    		clickedCell.text(result + ',');
    		edited = true;
    	}
    }
    
    function fLabel(result) {
    	// Function that is called when creating a new label
    	if(result != null){
    		clickedCell.text(result);
    		clickedCell.css("color","black");
    		labels.push(result);
    		edited = true;
    	}
    }
	
	this.figCode;
	if (this.figNum == 113) {
		// Editor Calls
	} else if (this.figNum == 114) {
		// Editor Calls
	} else if (this.figNum == 115) {
		// Editor Calls
	} else if (this.figNum == 116) {
		// Editor Calls
	} else if (this.figNum == 119) {
		// Editor Calls
	} else if (this.figNum == 1110) {
		// Editor Calls
	} else if (this.figNum == 1111) {
		// Editor Calls
	} else if (this.figureMode ==  false) {
		// Editor Calls
		// Essentially empty box
		editor1.setCellClickListener(function(event){
			console.log('from index, editor1: cell click');
			console.log('\t' + $(this).attr('class'));
			
			if($(this).hasClass("insert")){
				if($(this).css('cursor', 'pointer')) {
					if($(this).parent().index() >= memPointer-1){
						editor1.selectRowByIndex($(this).parent().index());
					}
				}
			}
			else if($(this).hasClass("lineNum")){
				console.log($(this).parent().parent().parent().parent().parent().index());
				console.log("Pre-Deletion memPointer = "+memPointer);
				deleteCell = $(this).parent().parent().parent().parent().parent().index();
				createAlertBox("Delete", "Delete this line?", false, fDelete, editorDiv);
			}
			else{
				// Woo! We can use this section later! :D
				var cellVal = $(this).text();					// grab the cell value of clicked cell
				var cellNum = $(this).index();					// grab the cell number of clicked cell
				var rowNum = ($(this).parent().parent().parent().parent().parent().index());	// grab row number in codeTable of clicked cell
				clickedCell = $(this);
	            clickedCellNum = cellNum;
	            
	            if($(this).hasClass("bits"))
	            {
	            	//console.log("Hey, this one has bits!");
	            	createNumBitsPad(0, 15, "Shift how many bits?", "Enter a number between 0 and 15", false, 10, fReturn, editorDiv);
	            }
	            else if($(this).hasClass("const1"))
	            {
	            	//console.log("This one should have a big constant.");
	            	createConstNumPad(-32768, 32767, "What's stored here?", "Enter a number between -32,768 and 32,767", false, 10, fReturn, editorDiv);
	            }
	            else if($(this).hasClass("const2"))
	            {
	            	//console.log("This one should have a small constant.");
	            	createConstNumPad(0, 255, "What value?", "Enter a number between 0 and 255", false, 10, fReturn, editorDiv);
	            }
	            else if($(this).hasClass("label1"))
	            {
	            	//console.log("This one will be using the label-maker.");
	            	createLabelMaker("Create a label", "", fLabel, editorDiv);
	            }
	            else if($(this).hasClass("label2"))
	            {
	            	//console.log("This one will be selecting from the labels");
	            	createLabelSelector("Use which label?", labels, fReturn, editorDiv);
	            }
	            else if($(this).hasClass("reg1"))
	            {
	            	//console.log("This one will select from the registers");
	            	createRegSelector("Select a register", registers, fRegisterC, editorDiv);
	            }
	            else if($(this).hasClass("reg2"))
	            {
	            	//console.log("This one will select from the registers");
	            	createRegSelector("Select a register", registers, fRegister, editorDiv);
	            }
	            else if($(this).hasClass("cond"))
	            {
	            	//console.log("This is a conditional thing...");
	            	createCondSelector("What conditions?", conditions, fReturnC, editorDiv);
	            } else {
	            	console.log("Hey! That doesn't do anything, silly!");
	            }
				
				//alert("from editor1: " + $(this).html());
			}
				
			return false;
		});
		
		editor1.setInsertBarMouseEnterListener(function(event){
			//console.log('from index, editor1: mouseEnter');
			//console.log('\t' + $(this).attr('class'));
			editor1.moveInsertionBarCursor($(this).parent().index());
			
			return false;
		});
	}

	
	var assemblyName = 'assembly' + this.figNum;
	console.log(assemblyName);
	var assemblycontroller = 'assemblycontroller' + this.figNum;
	console.log(assemblycontroller);
	var tabsstuff = angular
	.module(assemblyName, [ 'ui.bootstrap' ])

	.provider(
			'assembler',
			function() {

				var assembler = function(tableName, varTable, figureMode) {
					this.tableName = tableName;

					var parser = this;
					this.complete = false;
					this.intervalID;
					// Determines if in Figure or Architecture mode
					// True for Figure, False if Architecture
					this.figureMode = figureMode; // Outdated

					// A flag indicating whether the program has been run
					// before
					// Primarily used for checking if values should be reset
					this.done = false;

					// Initial program counter
					// Increased when .Block and .Word is used/modified
					this.programCounter = 0;

					this.previousCounter = 0;

					this.offSet = 0;

					// Current program counter
					// Kept constant
					this.startCounter = this.programCounter;

					// Flag for Overflow
					// Set whenever a register goes over 32767
					this.overflowFlag = 0;

					// Flag for Negative
					// Set whenever a register has stored a negative value
					this.negativeFlag = 0;

					// Flag for Carry
					// Set when ???
					this.carryFlag = 0;

					// Flag for Zero
					// Set whenever a register holds a zero value
					this.zeroFlag = 0;

					// Alerts the controller that the program has finished
					this.stop = false;

					// List of used variables
					// More important in figure mode
					// index1 = label
					// index2 = value
					// index3 = memoryLocation
					this.varMemory = [];

					this.varRegister = [];

					// List of memory labels
					// Helps with memory lookup
					this.labels = [];

					// For ease of adjustment later
					// References to Column # of each attribute
					this.labelNum = 0;
					this.cmdNum = 1;
					this.arg1Num = 2;
					this.arg2Num = 3;
					this.arg3Num = 4;

					// Information Storage for Registers
					// Also gives flag about if Registers are used
					// Initial firstChild.nodeValues set to 0 and false
					this.register = [ [ "REG0", 0, false, "REG0," ], // Reg0
					                  [ "REG1", 0, false, "REG1," ], // Reg1
					                  [ "REG2", 0, false, "REG2," ], // Reg2
					                  [ "REG3", 0, false, "REG3," ], // Reg3
					                  [ "REG4", 0, false, "REG4," ], // Reg4
					                  [ "REG5", 0, false, "REG5," ], // Reg5
					                  [ "REG6", 0, false, "REG6," ], // Reg6
					                  [ "REG7", 0, false, "REG7," ], // Reg7
					                  [ "REG8", 0, false, "REG8," ], // Reg8
					                  [ "REG9", 0, false, "REG9," ], // Reg9
					                  [ "REGA", 0, false, "REGA," ], // RegA
					                  [ "REGB", 0, false, "REGB," ], // RegB
					                  [ "REGC", 0, false, "REGC," ], // RegC
					                  [ "REGD", 0, false, "REGD," ], // RegD
					                  [ "REGE", 0, false, "REGE," ], // RegE
					                  [ "REGF", 0, false, "REGF," ] // RegF
									];

					// Memory storage
					// Initially zero before starting
					this.memory = new Array(256);
					for (var i = 0; i < 256; i++) {
						this.memory[i] = [ "0", "0", "0", "0" ];
					}

					// Stores initial values for memory
					// Used in resetting the program
					this.initMemory = [];

					// Stores initial values for variables
					// Used in resetting the program
					this.initVarMemory = [];
					this.initVarRegister = [];

					// Converts a number to a hexidecimal with defined
					// padding
					this.decimalToHex = function(d, padding) {
						var hex = Number(d).toString(16);
						padding = typeof (padding) === "undefined"
								|| padding === null ? padding = 2 : padding;

						if (d >= 0) {
							while (hex.length < padding) {
								hex = "0" + hex;
							}

							return hex.toUpperCase();
						}

						var finalVal = parseInt(hex, 16);
						// console.log("FinalVal is " + finalVal);
						if (finalVal < 0) {
							finalVal = 0xFFFF + finalVal + 1;
						}

						return finalVal.toString(16).toUpperCase();
					};

					this.hexToDecimal = function(hex, size) {
						var isNegative = hex[0] == "8" || hex[0] == "9"
								|| hex[0] == "A" || hex[0] == "B"
								|| hex[0] == "C" || hex[0] == "D"
								|| hex[0] == "E" || hex[0] == "F";
						var finalVal = hex;
						if (isNegative) {
							finalVal = ~finalVal;

							finalVal = parseInt(finalVal, 16);
						} else {
							finalVal = parseInt(finalVal, 16);
						}
						return finalVal;
					};

					this.isNumber = function(n) {
						return !isNaN(parseFloat(n)) && isFinite(n);
					};

					// Performs the size checking of a register at index to
					// ensure 16bit functionality
					// If overflow occurs, handles accordingly
					this.checkRegister = function(index) {
						var regValue = this.register[index][1];
						if (regValue > 32768) {
							this.overflow = 1;
							var hex = this.decimalToHex(
									this.register[index][1], 4);
							var length = hex.length;
							var value = "";
							for (var i = 8; i >= 1; i--) {
								value = value + hex[length - i];
							}
							this.register[index][1] = this.hexToDecimal(
									value, 4);
						}
						if (regValue < -32768) {
							var hex = this.decimalToHex(
									this.register[index][1], 4);
							var length = hex.length;
							var value = "";
							for (var i = 8; i >= 1; i--) {
								value = value + hex[length - i];
							}
							this.register[index][1] = this.hexToDecimal(
									value, 4);
						}
					};

					// Clears the values of the registers
					this.clearRegister = function() {
						for (var i = 0; i < 16; i++) {
							this.register[i][1] = 0;
						}
					};

					// Checks through the program to ensure that no code has been left with default values
					this.preprocessor = function() {
						var size = editor1.getRowCount();
						var errors = [];
						for(var i = 0; i < size; i++){
							var table = editor1.rowToArray(i);
							switch (table[1]) {
							case ".WORD": // .Word before program
							case ".BLOCK":
								if(table[0] == "&lt;label&gt;" || table[2] == "&lt;const&gt;"){
									errors.push(i+1);
								}
								break;
							case "HALT":
								break;
							case "LOAD":
								if(table[2] == "&lt;reg&gt;," || table[3] == "&lt;label&gt;"){
									errors.push(i+1);
								}
								break;
							case "LOADIMM":
								if(table[2] == "&lt;reg&gt;," || table[3] == "&lt;const&gt;"){
									errors.push(i+1);
								}
								break;
							case "LOADIND":
								if(table[2] == "&lt;reg&gt;," || table[3] == "&lt;reg&gt;"){
									errors.push(i+1);
								}
								break;
							case "STORE":
								if(table[2] == "&lt;reg&gt;," || table[3] == "&lt;label&gt;"){
									errors.push(i+1);
								}
								break;
							case "STOREIND":
								if(table[2] == "&lt;reg&gt;," || table[3] == "&lt;reg&gt;"){
									errors.push(i+1);
								}
								break;
							case "AND":
								if(table[2] == "&lt;reg&gt;," || table[3] == "&lt;reg&gt;," || table[4] == "&lt;reg&gt;"){
									errors.push(i+1);
								}
								break;
							case "ADD":
								if(table[2] == "&lt;reg&gt;," || table[3] == "&lt;reg&gt;," || table[4] == "&lt;reg&gt;"){
									errors.push(i+1);
								}
								break;
							case "SUBTRACT":
								if(table[2] == "&lt;reg&gt;," || table[3] == "&lt;reg&gt;," || table[4] == "&lt;reg&gt;"){
									errors.push(i+1);
								}
								break;
							case "OR":
								if(table[2] == "&lt;reg&gt;," || table[3] == "&lt;reg&gt;," || table[4] == "&lt;reg&gt;"){
									errors.push(i+1);
								}
								break;
							case "ASL":
								if(table[2] == "&lt;reg&gt;," || table[3] == "&lt;reg&gt;," || table[4] == "&lt;bits&gt;"){
									errors.push(i+1);
								}
								break;
							case "ASR":
								if(table[2] == "&lt;reg&gt;," || table[3] == "&lt;reg&gt;," || table[4] == "&lt;bits&gt;"){
									errors.push(i+1);
								}
								break;
							case "NOT":
								if(table[2] == "&lt;reg&gt;," || table[3] == "&lt;reg&gt;"){
									errors.push(i+1);
								}
								break;
							case "COMPARE":
								if(table[2] == "&lt;reg&gt;," || table[3] == "&lt;reg&gt;"){
									errors.push(i+1);
								}
								break;
							case "BRANCH":
								if(table[2] == "&lt;cond&gt;," || table[3] == "&lt;label&gt;"){
									errors.push(i+1);
								}
								break;
							case "JUMP":
								if(table[2] == "&lt;label&gt;"){
									errors.push(i+1);
								}
								break;
							}
						}
						if(errors.length > 0){
							createAlertBox("You have unfinished code at: ", errors, true, null);
							this.complete = false;
						} else {
							this.complete = true;
						}
						return 0;
					};


					// Goes through and checks through the table for changes
					// as well as which variables are in use.
					// Initializes the Registers and Variable arrays if
					// needed.
					// If on figure tab, also populates Variable Table.
					this.init = function() {
						console.log("Init has been called.");
						var table;
						// "Compile"
						var progLine = 0;
						var memLine = 0;
						var refLine = 0;
						var index = 0;
						this.offSet = 0;
						this.startCounter = 0;
						this.previousCounter = 0;
						this.programCounter = 0;
						
						this.memory = [];
						this.memory = new Array(256);
						for (var i = 0; i < 256; i++) {
							this.memory[i] = [ "0", "0", "0", "0" ];
						}

						this.initMemory = [];
						this.initMemory = new Array(256);
						for (var i = 0; i < 256; i++) {
							this.initMemory[i] = ["0", "0", "0", "0"];
						}
						this.initVarMemory = [];
						this.initVarRegister = [];
						
						// Populate the labels array for memory lookup
						while (progLine < editor1.getRowCount()) {
							table = editor1.rowToArray(progLine);
							if (table[this.labelNum] != null) {
								var ref = table[this.labelNum];
								this.labels[refLine++] = [ ref, progLine + this.offSet ];
								if (table[this.cmdNum] == ".BLOCK") {
									this.offSet += parseInt(table[this.arg1Num],10) - 1;
								}
							}
							progLine++;
						}

						this.previousCounter = this.offSet;

						// Begin "assembling" into Machine code in
						// this.memory
						progLine = 0;
						while (progLine < editor1.getRowCount()) {
							table = editor1.rowToArray(progLine);
							switch (table[this.cmdNum]) {
							case ".WORD": // .Word before program
								// Store firstChild.nodeValue based on
								// argument
								var arg1 = table[this.arg1Num];

								var hex = parseInt(arg1, 10);
								// hex length checking goes here.
								hex = this.decimalToHex(hex, 4);
								// Store in memory and update program
								// counter
								this.memory[memLine] = [ hex[0], hex[1], hex[2], hex[3] ];
								this.initMemory[memLine] = [ hex[0], hex[1], hex[2], hex[3] ];
								this.programCounter++;
								this.startCounter = this.programCounter;
								// Store variable for display
								this.varMemory[index] = [table[this.labelNum], arg1, memLine++ ];
								this.initVarMemory[index] = [ this.varMemory[index][0], this.varMemory[index][1], this.varMemory[index++][2] ];
								break;

							case ".BLOCK": // .Block before program
								// Reserve number of rows indicated by argument
								var arg1 = table[this.arg1Num];
								for (var i = 0; i < arg1; i++) {
									this.memory[memLine] = [ '0', '0', '0', '0' ];
									this.initMemory[memLine] = [ '0', '0', '0', '0' ];
									this.programCounter++;
									this.startCounter = this.programCounter;
									// Store in Variable Array
									var name = table[this.labelNum];
									if(arg1 > 1){
										name = name +'['+i+']';
									}
									this.varMemory[index] = [name,  0, memLine++];
									this.initVarMemory[index] = [this.varMemory[index][0],this.varMemory[index][1],this.varMemory[index++][2]];
								}
								break;

							case "LOADIMM": // 0000b LoadImm
								// Find and flag specified register
								var arg1, arg2;
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg1Num]
											|| this.register[i][3] === table[this.arg1Num]) {
										arg1 = i;
										this.register[i][2] = true;
										break;
									}
								}
								// Get value to be stored in Register
								arg2 = table[this.arg2Num];
								var hex = parseInt(arg2, 10);
								// hex length checking goes here.
								hex = this.decimalToHex(hex, 2);
								// Store in memory
								this.memory[memLine++] = [ 0, arg1, hex[0],
										hex[1] ];
								break;

							case "LOAD": // 0001b Load
								// Find and flag specified register
								var arg1, arg2, label;
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg1Num]
											|| this.register[i][3] === table[this.arg1Num]) {
										arg1 = i;
										this.register[i][2] = true;
										break;
									}
								}
								// Find correct memory location via label
								label = table[this.arg2Num];
								for (var i = 0; i < this.labels.length; i++) {
									if (this.labels[i][0] === label) {
										arg2 = this.labels[i][1];
										i += this.labels.length;
									}
								}
								// Break memory up into hex location
								var hex = parseInt(arg2, 10);
								hex = this.decimalToHex(hex, 2);
								// Store in memory and update program
								// counter
								this.memory[memLine++] = [ 1, arg1, hex[0],
										hex[1] ];
								break;

							case "STORE": // 0010b Store
								// Find and flag specified register
								var arg1, arg2, label;
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg1Num]
											|| this.register[i][3] === table[this.arg1Num]) {
										arg1 = i;
										this.register[i][2] = true;
										break;
									}
								}
								// Find correct memory location via label
								label = table[this.arg2Num];
								for (var i = 0; i < this.labels.length; i++) {
									if (this.labels[i][0] === label) {
										arg2 = this.labels[i][1];
										i += this.labels.length;
									}
								}
								// Convert decimal memory location to hex
								var hex = parseInt(arg2, 10);
								hex = this.decimalToHex(hex, 2);
								// Store in memory and update program
								// counter
								this.memory[memLine++] = [ 2, arg1, hex[0],
										hex[1] ];
								break;

							case "LOADIND": // 0011b LoadInd
								var arg1, arg2;
								// Find and flag specified Registers
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg1Num]
											|| this.register[i][3] === table[this.arg1Num]) {
										arg1 = i;
										this.register[i][2] = true;
										break;
									}
								}
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg2Num]
											|| this.register[i][3] === table[this.arg2Num]) {
										arg2 = i;
										this.register[i][2] = true;
										break;
									}
								}
								// Store in memory
								this.memory[memLine++] = [ 3, arg1, arg2, 0 ];
								break;

							case "STOREIND": // 0100b StoreInd
								var arg1, arg2;
								// Find and flag specified registers
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg1Num]
											|| this.register[i][3] === table[this.arg1Num]) {
										arg1 = i;
										this.register[i][2] = true;
										break;
									}
								}
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg2Num]
											|| this.register[i][3] === table[this.arg2Num]) {
										arg2 = i;
										this.register[i][2] = true;
										break;
									}
								}
								// Store in memory
								this.memory[memLine++] = [ 4, arg1, arg2, 0 ];
								break;

							case "ADD": // 0101b Add
								var arg1, arg2, arg3;
								// Find and flag the specified registers
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg1Num]
											|| this.register[i][3] === table[this.arg1Num]) {
										arg1 = i;
										this.register[i][2] = true;
										break;
									}
								}
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg2Num]
											|| this.register[i][3] === table[this.arg2Num]) {
										arg2 = i;
										this.register[i][2] = true;
										break;
									}
								}
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg3Num]
											|| this.register[i][3] === table[this.arg3Num]) {
										arg3 = i;
										this.register[i][2] = true;
										break;
									}
								}
								// Store in memory
								this.memory[memLine++] = [ 5, arg1, arg2,
										arg3 ];
								break;

							case "SUBTRACT": // 0110b Subtract
								var arg1, arg2, arg3;
								// Find and flag specified registers
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg1Num]
											|| this.register[i][3] === table[this.arg1Num]) {
										arg1 = i;
										this.register[i][2] = true;
										break;
									}
								}
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg2Num]
											|| this.register[i][3] === table[this.arg2Num]) {
										arg2 = i;
										this.register[i][2] = true;
										break;
									}
								}
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg3Num]
											|| this.register[i][3] === table[this.arg3Num]) {
										arg3 = i;
										this.register[i][2] = true;
										break;
									}
								}
								// Store in memory
								this.memory[memLine++] = [ 6, arg1, arg2,
										arg3 ];
								break;

							case "AND": // 0111b And
								var arg1, arg2, arg3;
								// Find and flag specified registers
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg1Num]
											|| this.register[i][3] === table[this.arg1Num]) {
										arg1 = i;
										this.register[i][2] = true;
										break;
									}
								}
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg2Num]
											|| this.register[i][3] === table[this.arg2Num]) {
										arg2 = i;
										this.register[i][2] = true;
										break;
									}
								}
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg3Num]
											|| this.register[i][3] === table[this.arg3Num]) {
										arg3 = i;
										this.register[i][2] = true;
										break;
									}
								}
								// Store in memory
								this.memory[memLine++] = [ 7, arg1, arg2,
										arg3 ];
								break;

							case "OR": // 1000b Or
								var arg1, arg2, arg3;
								// find and flag specified registers
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg1Num]
											|| this.register[i][3] === table[this.arg1Num]) {
										arg1 = i;
										this.register[i][2] = true;
										break;
									}
								}
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg2Num]
											|| this.register[i][3] === table[this.arg2Num]) {
										arg2 = i;
										this.register[i][2] = true;
										break;
									}
								}
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg3Num]
											|| this.register[i][3] === table[this.arg3Num]) {
										arg3 = i;
										this.register[i][2] = true;
										break;
									}
								}
								// Store in memory
								this.memory[memLine++] = [ 8, arg1, arg2, arg3 ];
								break;

							case "NOT": // 1001b Not
								var arg1, arg2;
								// Find and flag specified registers
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg1Num]
											|| this.register[i][3] === table[this.arg1Num]) {
										arg1 = i;
										this.register[i][2] = true;
										break;
									}
								}
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg2Num]
											|| this.register[i][3] === table[this.arg2Num]) {
										arg2 = i;
										this.register[i][2] = true;
										break;
									}
								}
								// Store in memory
								this.memory[memLine++] = [ 9, arg1, arg2, 0 ];
								break;

							case "ASL": // 1010b ASL
								var arg1, arg2, arg3;
								// Find and flag specified registers
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg1Num]
											|| this.register[i][3] === table[this.arg1Num]) {
										arg1 = i;
										this.register[i][2] = true;
										break;
									}
								}
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg2Num]
											|| this.register[i][3] === table[this.arg2Num]) {
										arg2 = i;
										this.register[i][2] = true;
										break;
									}
								}
								// Grab # of bits to shift
								arg3 = table[progLine][this.arg3Num];
								// Store in memory
								this.memory[memLine++] = [ 10, arg1, arg2, arg3 ];
								break;

							case "ASR": // 1011b ASR
								var arg1, arg2, arg3;
								// Find and flag specified registers
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg1Num]
											|| this.register[i][3] === table[this.arg1Num]) {
										arg1 = i;
										this.register[i][2] = true;
										break;
									}
								}
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg2Num]
											|| this.register[i][3] === table[this.arg2Num]) {
										arg2 = i;
										this.register[i][2] = true;
										break;
									}
								}
								// Grab # of bits to shift
								arg3 = table[progLine][this.arg3Num];
								// Store in memory
								this.memory[memLine++] = [ 11, arg1, arg2, arg3 ];
								break;

							case "COMPARE": // 1100b Compare
								var arg1, arg2, arg3;
								arg1 = 0;
								// Find and flag specified registers
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg1Num]
											|| this.register[i][3] === table[this.arg1Num]) {
										arg2 = i;
										this.register[i][2] = true;
										break;
									}
								}
								for (var i = 0; i < 16; i++) {
									if (this.register[i][0] === table[this.arg2Num]
											|| this.register[i][3] === table[this.arg2Num]) {
										arg3 = i;
										this.register[i][2] = true;
										break;
									}
								}
								// Store in memory
								this.memory[memLine++] = [ 12, arg1, arg2, arg3 ];
								break;

							case "BRANCH": // 1101b Branch
								var arg1, arg2, label;
								// Determine boolean test
								switch (table[this.arg1Num]) {
								case 'EQ,':
									arg1 = 0;
									break;
								case 'NE,':
									arg1 = 1;
									break;
								case 'LT,':
									arg1 = 2;
									break;
								case 'LE,':
									arg1 = 3;
									break;
								case 'GT,':
									arg1 = 4;
									break;
								case 'GE,':
									arg1 = 5;
									break;
								case 'CARRY,':
									arg1 = 6;
									break;
								case 'NEG,':
									arg1 = 7;
									break;
								case 'ZERO,':
									arg1 = 8;
									break;
								case 'OVER,':
									arg1 = 9;
									break;
								}
								// Find memory location to jump to
								label = table[this.arg2Num];
								for (var i = 0; i < this.labels.length; i++) {
									if (this.labels[i][0] === label) {
										arg2 = this.labels[i][1];
										i += this.labels.length;
									}
								}
								// Convert to hex to store in memory
								var hex = parseInt(arg2, 10);
								// hex length checking goes here.
								hex = this.decimalToHex(hex, 2);
								// Store in memory
								this.memory[memLine++] = [ 13, arg1,
										hex[0], hex[1] ];
								break;

							case "JUMP": // 1110b Jump
								var arg1, arg2, label;
								arg1 = 0;
								// Find memory location to jump to
								label = table[progLine][this.arg1Num];
								for (var i = 0; i < this.labels.length; i++) {
									if (this.labels[i][0] == label) {
										arg2 = this.labels[i][1];
										i += this.labels.length;
									}
								}
								// convert to hex to store in memory
								var hex = parseInt(arg2, 10);
								// console.log(hex);
								// hex length checking goes here.
								hex = this.decimalToHex(hex, 2);
								// Store in memory
								this.memory[memLine++] = [ 14, arg1,
										hex[0], hex[1] ];
								break;

							case "HALT": // 1111b Halt
								this.memory[memLine++] = [ 15, 0, 0, 0 ];
								break;
							}
							progLine++;
						}
						// Iterate over registers to see which ones are used
						// Create cells in variable array for these
						// registers
						var varRegIndex = 0;
						for (var i = 0; i < 16; i++) {
							if (this.register[i][2]) {
								this.varRegister[varRegIndex] = [
										this.register[i][0], 0 ];
								this.initVarRegister[varRegIndex] = [
										this.varRegister[varRegIndex][0],
										this.varRegister[varRegIndex++][1] ];
							}
						}
						// Signal that program has been parsed
						edited = false;
						return 0;
					};

					// Add two registers and store in the first
					// Logically: Reg1 = Reg2 + Reg3
					this.add = function(reg1, reg2, reg3) {
						this.register[reg1][1] = this.register[reg2][1]
								+ this.register[reg3][1];
						// Value/Flag checking
						this.checkRegister(reg1);
						if (this.register[reg1][1] === 0) {
							this.zeroFlag = 1;
						} else {
							this.zeroFlag = 0;
						}
						if (this.register[reg1][1] >= -1) {
							this.negativeFlag = 1;
						} else {
							this.negativeFlag = 1;
						}
						// Update value in Variable array
						for (var i = 0; i < this.varRegister.length; i++) {
							if (this.varRegister[i][0] == this.register[reg1][0]) {
								this.varRegister[i][1] = this.register[reg1][1];
								break;
							}
						}
						// Debugging/Demo code
						// console.log("Add " + this.register[reg2][0] + "
						// and " + this.register[reg3][0]);
						// console.log(this.register[reg1][0]+ "= "
						// +this.register[reg1][1]);
					};

					// Subtract two registers and store in the first
					// Logically: Reg1 = Reg2 - Reg3
					this.sub = function(reg1, reg2, reg3) {
						this.register[reg1][1] = this.register[reg2][1]
								- this.register[reg3][1];
						// Value/Flag checking
						this.checkRegister(reg1);
						if (this.register[reg1][1] === 0) {
							this.zeroFlag = 1;
						} else {
							this.zeroFlag = 0;
						}
						if (this.register[reg1][1] <= -1) {
							this.negativeFlag = 1;
						} else {
							this.negativeFlag = 0;
						}

						// Update value in Variable array
						for (var i = 0; i < this.varRegister.length; i++) {
							if (this.varRegister[i][0] == this.register[reg1][0]) {
								this.varRegister[i][1] = this.register[reg1][1];
							}
						}
						// Debugging/Demo code
						// console.log("Subtract " + this.register[reg2][0]
						// + " and " + this.register[reg3][0]);
						// console.log(this.register[reg1][0]+ "= "
						// +this.register[reg1][1]);
					};

					// Store the data in reg into memory at location pointed
					// to by value1 and value2
					// value1 and value2 are in hex
					this.store = function(reg, value1, value2) {
						// Convert data from register into hex
						var hex = this.decimalToHex(this.register[reg][1], 4);
						// Store register data in hex in memory
						this.memory[parseInt(value1 + value2, 16)] = [ hex[0], hex[1], hex[2], hex[3] ];
						// Update value in Variable array
						var x = parseInt(value1 + value2, 16);
						for (var i = 0; i < this.varMemory.length; i++) {
							// Find variable by memory location
							if (this.varMemory[i][2] == x) {
								this.varMemory[i][1] = this.register[reg][1];
							}

						}
						// Debug/Demo code
						// console.log("Store " + this.register[reg][0] + "
						// in Memory");
						// console.log("Memory @" +x+ " = " +
						// this.memory[x]);
					};

					// Performs Binary And on two registers and stores into
					// the first
					// Logically: Reg1 = Reg2 AND Reg3
					this.and = function(reg1, reg2, reg3) {
						this.register[reg1][1] = this.register[reg2][1]
								& this.register[reg3][1];
						this.checkRegister(reg1);
						// Update Variable array
						for (var i = 0; i < this.varRegister.length; i++) {
							if (this.varRegister[i][0] == this.register[reg1][0]) {
								this.varRegister[i][1] = this.register[reg1][1];
							}
						}
					};

					// Performs Binary Or on two registers and stores into
					// the first
					// Logically: Reg1 = Reg2 OR Reg3
					this.or = function(reg1, reg2, reg3) {
						this.register[reg1][1] = this.register[reg2][1]
								| this.register[reg3][1];
						this.checkRegister(reg1);
						// Update the Variable array
						for (var i = 0; i < this.varRegister.length; i++) {
							if (this.varRegister[i][0] == this.register[reg1][0]) {
								this.varRegister[i][1] = this.register[reg1][1];
							}
						}
					};

					// Performs Binary Not on a register and stores it into
					// another
					// Logically: Reg1 = NOT Reg2
					this.not = function(reg1, reg2) {
						this.register[reg1][1] = ~this.register[reg2][1];
						this.checkRegister(reg1);
						// Update the Variable array
						for (var i = 0; i < this.varRegister.length; i++) {
							if (this.varRegister[i][0] == this.register[reg1][0]) {
								this.varRegister[i][1] = this.register[reg1][1];
							}
						}
					};

					// Performs the Arithmetic Shift Left on the given
					// register by #bits
					// Logically: Reg1 = ASL Reg2 #Bits
					this.asl = function(reg1, reg2, bits) {
						// Parse number of bits (in hex)
						var tBits = parseInt(bits, 16);
						this.register[reg1][1] = this.register[reg2][1] << tBits;
						this.checkRegister(reg1);
						// Update the variable array
						for (var i = 0; i < 16; i++) {
							if (this.varRegister[i][0] == this.register[reg1][0]) {
								this.varRegister[i][1] = this.register[reg1][1];
							}
						}
					};

					// Performs the Arithmetic Shift Right on the given
					// register by #bits
					// Logically: Reg1 = ASR Reg2 #Bits
					this.asr = function(reg1, reg2, bits) {
						// Parse number of bits (in hex)
						var tBits = parseInt(bits, 16);
						this.register[reg1][1] = this.register[reg2][1] >>> tBits;
						this.checkRegister(reg1);
						// Update the variable array
						for (var i = 0; i < this.varRegister.length; i++) {
							if (this.varRegister[i][0] == this.register[reg1][0]) {
								this.varRegister[i][1] = this.register[reg1][1];

							}
						}
					};

					// Store a value in memory pointed at by another
					// register
					this.storeInd = function(reg1, reg2) {
						//console.log(this.decimalToHex(this.register[reg1][1], 4));
						var hex = this.decimalToHex(this.register[reg1][1], 4);
						this.memory[this.register[reg2][1]] = [hex[0], hex[1], hex[2], hex[3]];
						// Updating of the Variable array
						var x = parseInt(this.register[reg2][1], 10);
						for (var i = 0; i < this.varMemory.length; i++) {
							// Find memory name via location
							if (this.varMemory[i][2] === x) {
								this.varMemory[i][1] = this.register[reg1][1];
								break;
							}
						}
						// Debug Code
						// console.log("STOREIND "+ this.register[reg2][1]+" = "+this.register[reg1][1]);
						// console.log("VarMemory :"+this.varMemory[i][2]);
					};

					// Load value stored in memory into register
					// mem1 and mem2 are in hex
					this.load = function(reg, mem1, mem2) {
						// Get value from memory
						var num = this.memory[parseInt(mem1 + mem2, 16)];
						// Store value into register
						this.register[reg][1] = parseInt(num[0] + num[1]
								+ num[2] + num[3], 16);
						// Update Variable array
						for (var i = 0; i < this.varRegister.length; i++) {
							if (this.varRegister[i][0] == this.register[reg][0]) {
								this.varRegister[i][1] = this.register[reg][1];
							}
						}
						// Debug/Demo Code
						// console.log("Load " + this.register[reg][0]);
						// console.log(this.register[reg][0]+ "= " +this.register[reg][1]);
					};

					// Load a given value into a register
					// value1 and value2 are in hex
					this.loadImm = function(reg, value1, value2) {
						// Parse and store value into register
						var x = "" + value1 + value2;
						this.register[reg][1] = this.hexToDecimal(x, 2);
						// Update Variable array
						for (var i = 0; i < this.varRegister.length; i++) {
							if (this.varRegister[i][0] == this.register[reg][0]) {
								this.varRegister[i][1] = this.register[reg][1];
							}
						}
						// Debug/Demo code
						// console.log("LoadImm " + this.register[reg][0]);
						// console.log(this.register[reg][0]+ "= "
						// +this.register[reg][1]);
					};

					// Load into a register the value in memory pointed to
					// by another register
					this.loadInd = function(reg1, reg2) {
						// Reference and store value
						this.register[reg1][1] = this.memory[this.register[reg2][1]];
						// Update Variable Array
						for (var i = 0; i < this.varRegister.length; i++) {
							if (this.varRegister[i][0] == this.register[reg][0]) {
								this.varRegister[i][1] = this.register[reg][1];
							}
						}
					};

					// Compares two registers and sets flags accordingly
					this.compare = function(reg1, reg2) {
						var number = this.register[reg1][1]
								- this.register[reg2][1];

						if (number < 0) {
							this.negativeFlag = 1;
						} else {
							this.negativeFlag = 0;
						}
						if (number == 0) {
							this.zeroFlag = 1;
						} else {
							this.zeroFlag = 0;
						}
						// console.log("Compare "+this.register[reg1][0]+"
						// and "+this.register[reg2][0]);
					};

					// Observes flags set by Compare and adjusts program
					// counter accordingly
					this.branch = function(cond, addr1, addr2) {
						// console.log("Branch "+cond);
						// console.log("Neg "+this.negativeFlag);
						// console.log("Zero "+this.zeroFlag);
						if (cond == "0") {
							// EQ
							if (this.zeroFlag == 1) {
								this.jump(addr1, addr2);
								return;
							}
						} else if (cond == "1") {
							// NE
							if (this.zeroFlag == 0) {
								this.jump(addr1, addr2);
								return;
							}
						} else if (cond == "2") {
							// LT
							if (this.negativeFlag == 1) {
								this.jump(addr1, addr2);
								return;
							}
						} else if (cond == "3") {
							// LE
							if (this.zeroFlag == 1
									|| this.negativeFlag == 1) {
								this.jump(addr1, addr2);
								return;
							}
						} else if (cond == "4") {
							// GT
							if (this.zeroFlag == 0
									&& this.negativeFlag == 0) {
								this.jump(addr1, addr2);
								return;
							}
						} else if (cond == "5") {
							// GE
							if (this.negativeFlag == 0) {
								this.jump(addr1, addr2);
								return;
							}
						} else if (cond == "6") {
							// CARY
							if (this.carryFlag == 1) {
								this.jump(addr1, addr2);
								return;
							}
						} else if (cond == "7") {
							// Neg
							if (this.negativeFlag == 1) {
								this.jump(addr1, addr2);
								return;
							}
						} else if (cond == "8") {
							// Zero
							if (this.zeroFlag == 1) {
								this.jump(addr1, addr2);
								return;
							}
						} else if (cond == "9") {
							// over
							if (this.overflowFlag == 1) {
								this.jump(addr1, addr2);
								return;
							}
						}
						this.programCounter++;

					};

					// Sets program counter to be equal to the given memory
					// address
					this.jump = function(addr1, addr2) {
						this.programCounter = parseInt(addr1 + addr2, 16);
						// console.log("Jump "+addr1+addr2);
					};

					// Sets the stop flag to true.
					// Essentially tells the program to stop.
					// Also resets the program counter.
					this.halt = function() {
						// clearInterval(this.intervalID);
						this.stop = true;
						this.done = true;
						// console.log("Halt!");
					};

					// Evaluates the command at the given line.
					// Essentially the core interpreter of the program
					// Changes RegN values into index numbers
					this.eval = function(line) {
						switch (this.memory[line][0]) {
						case 0: // 0000b LoadImm
							this.loadImm(this.memory[line][1],
									this.memory[line][2],
									this.memory[line][3]);
							this.programCounter++;
							break;
						case 1: // 0001b Load
							this.load(this.memory[line][1],
									this.memory[line][2],
									this.memory[line][3]);
							this.programCounter++;
							break;
						case 2: // 0010b Store
							this.store(this.memory[line][1],
									this.memory[line][2],
									this.memory[line][3]);
							this.programCounter++;
							break;
						case 3: // 0011b LoadInd
							this.loadInd(this.memory[line][1],
									this.memory[line][2]);
							this.programCounter++;
							break;
						case 4: // 0100b StoreInd
							this.storeInd(this.memory[line][1],
									this.memory[line][2]);
							this.programCounter++;
							break;
						case 5: // 0101b Add
							this.add(this.memory[line][1],
									this.memory[line][2],
									this.memory[line][3]);
							this.programCounter++;
							break;
						case 6: // 0110b Subtract
							this.sub(this.memory[line][1],
									this.memory[line][2],
									this.memory[line][3]);
							this.programCounter++;
							break;
						case 7: // 0111b And
							this.and(this.memory[line][1],
									this.memory[line][2],
									this.memory[line][3]);
							this.programCounter++;
							break;
						case 8: // 1000b Or
							this.or(this.memory[line][1],
									this.memory[line][2],
									this.memory[line][3]);
							this.programCounter++;
							break;
						case 9: // 1001b Not
							this.not(this.memory[line][1],
									this.memory[line][2],
									this.memory[line][3]);
							this.programCounter++;
							break;
						case 10: // 1010b ASL
							this.asl(this.memeory[line][1],
									this.memory[line][2],
									this.memory[line][3]);
							this.programCounter++;
							break;
						case 11: // 1011b ASR
							this.asr(this.memory[line][1],
									this.memory[line][2],
									this.memory[line][3]);
							this.programCounter++;
							break;
						case 12: // 1100b Compare
							this.compare(this.memory[line][2],
									this.memory[line][3]);
							this.programCounter++;
							break;
						case 13: // 1101b Branch
							this.branch(this.memory[line][1],
									this.memory[line][2],
									this.memory[line][3]);
							break;
						case 14: // 1110b Jump
							this.jump(this.memory[line][2],
									this.memory[line][3]);
							break;
						case 15: // 1111b Halt
							this.halt();
							break;
						}
					};

					// Walks through one step of the program
					this.walk = function() {
						var table = editor1.rowToArray(this.programCounter);
						//console.log("Edited: "+edited);
						//if (this.done) {
							//this.reset();
							// console.log("Would you like to go again?");
							//this.done = false;
						//}
						if (!this.stop) {

							this.previousCounter = this.programCounter;

							editor1.selectAndHighlightRowByIndex(this.programCounter-this.offSet);
							parser.eval(this.programCounter);

						} else {
							// console.log("Inner Walk stop is true");
						}
						return 0;
					};

					// Runs through the program
					// First checks if the code has recently been edited.
					this.run = function() {
						//if (edited) {
							//var temp = this.preprocessor();
							//if(complete){
							//	this.init();
							//	this.previousCounter = this.programCounter;
							//} else {
							//	this.stop = true;
							//}
						//} else if (this.done) {
							//this.reset();
						//}
					};

					// Pauses execution of program
					this.pause = function() {
						// legacy function
					};

					// Resets the program counter and restores program to
					// original state
					this.reset = function() {
						this.programCounter = this.startCounter;
						// Need to reset Memory
						console.log("Reset was called.")
						for (var i = 0; i < this.startCounter; i++) {
							this.memory[i][0] = this.initMemory[i][0];
							this.memory[i][1] = this.initMemory[i][1];
							this.memory[i][2] = this.initMemory[i][2];
							this.memory[i][3] = this.initMemory[i][3];
							// console.log("Line "+i+", Memory: "+this.memory[i]+", InitMem: "+this.initMemory[i]);
						}

						for (var i = 0; i < this.varMemory.length; i++) {
							this.varMemory[i][0] = this.initVarMemory[i][0];
							this.varMemory[i][1] = this.initVarMemory[i][1];
						}

						for (var i = 0; i < this.varRegister.length; i++) {
							this.varRegister[i][0] = this.initVarRegister[i][0];
							this.varRegister[i][1] = this.initVarRegister[i][1];
						}

						this.overflowFlag = 0;
						this.negativeFlag = 0;
						this.zeroFlag = 0;
						this.carryFlag = 0;

						this.clearRegister();
						this.done = false;
						this.stop = false;
						console.log("Reset has finished.");
						console.log("Program Counter: "+this.programCounter);
						return 0;
					};

					// Returns the current value of the program counter
					this.returncounter = function() {
						var progcount = this.programCounter;
						return progcount;
					};

					// Returns value of overflow flag
					this.returnOverflowFlag = function() {
						var overflowflag = this.overflowFlag;
						return overflowflag;
					};

					// Returns value of negative flag
					this.returnNegFlag = function() {
						var negflag = this.negativeFlag;
						return negflag;
					};

					// Returns value of carry flag
					this.returnCarryFlag = function() {
						var carryflag = this.carryFlag;
						return carryflag;
					};

					// Returns value of zero flag
					this.returnZeroFlag = function() {
						var zeroflag = this.zeroFlag;
						return zeroflag;
					};

				};

				this.$get = function() {
					return assembler;
				};


			});
console.log(this.figNum);
tabsstuff.controller(assemblycontroller,
	function($scope, assembler, $interval) {

	$scope.tabs = [];

	$scope.error = function() {
		document.write('<h1>you broke it.</h1>');
	};

	var tableName = "program";
	var varTable = "variables";
	var bool = false;
	var attemptingToRun = false;

	var runText = "Run";
	var walkText = "Walk";
	var intervalId;
	var hasRan = false;

	$scope.assembler = new assembler(tableName, varTable, bool);

	var memoryhasran = false;

	var memory = new Array(256);
	for ( var i = 0; i < 256; i++) {
		memory[i] = [ "0", "0", "0", "0" ];
	}
	
	
	// $scope.assembler.init();

	$scope.architecture = function(updateCounter) {

		// var varlength = $scope.assembler.varMemory.length;
		var varmemcount = 0;
		var regcount = 0;

		$scope.varMemory = [];
		$scope.addVarMemory = function() {
			$scope.varMemory.push({
				title : $scope.assembler.varMemory[varmemcount][0],
				value : $scope.assembler.varMemory[varmemcount][1]
			});
			varmemcount += 1;
		};

		$scope.varRegister = [];
		$scope.addVarRegister = function() {
			$scope.varRegister.push({
				title : $scope.assembler.varRegister[regcount][0],
				value : $scope.assembler.varRegister[regcount][1]
			});
			regcount += 1;
		};

		var assemblerReg = $scope.assembler.register;
		var register = [];
		for ( var i = 0; i < 16; i++) {
			register[i] = $scope.assembler.decimalToHex(assemblerReg[i][1], 4);
		}
		$scope.register = [];
		$scope.addRegister = function(num) {
			if (num < 10) {
				$scope.register.push({
					content : num,
					value : register[num]
				});
			} else if (num == 10) {
				$scope.register.push({
					content : "A",
					value : register[num]
				});
			} else if (num == 11) {
				$scope.register.push({
					content : "B",
					value : register[num]
				});
			} else if (num == 12) {
				$scope.register.push({
					content : "C",
					value : register[num]
				});
			} else if (num == 13) {
				$scope.register.push({
					content : "D",
					value : register[num]
				});
			} else if (num == 14) {
				$scope.register.push({
					content : "E",
					value : register[num]
				});
			} else if (num == 15) {
				$scope.register.push({
					content : "F",
					value : register[num]
				});
			}
		};

		var overflowFlag = $scope.assembler.returnOverflowFlag();
		$scope.overflowFlag = [ {
			flag : overflowFlag
		} ];

		var negativeFlag = $scope.assembler.returnNegFlag();
		$scope.negativeFlag = [ {
			flag : negativeFlag
		} ];

		var carryFlag = $scope.assembler.returnCarryFlag();
		$scope.carryFlag = [ {
			flag : carryFlag
		} ];

		var zeroFlag = $scope.assembler.returnZeroFlag();
		$scope.zeroFlag = [ {
			flag : zeroFlag
		} ];

		var temp = $scope.assembler.memory;
		$scope.temp = temp;

		$scope.varlength = $scope.assembler.varMemory.length;
		$scope.vars = [];
		
		
		
	
		
		$scope.addvars = function(num) {

			$scope.vars.push({
				memno : num,
				con1 : memory[num][0] = $scope.assembler.decimalToHex(temp[num][0], 1),
				con2 : memory[num][1] = $scope.assembler.decimalToHex(temp[num][1], 1),
				con3 : memory[num][2] = $scope.assembler.decimalToHex(temp[num][2], 1),
				con4 : memory[num][3] = $scope.assembler.decimalToHex(temp[num][3], 1)
			});

		};

		$scope.addmemory = function(num) {
			$scope.memory.push({
				memno : num,
				con1 : memory[num][0] = $scope.assembler.decimalToHex(temp[num][0], 1),
				con2 : memory[num][1] = $scope.assembler.decimalToHex(temp[num][1], 1),
				con3 : memory[num][2] = $scope.assembler.decimalToHex(temp[num][2], 1),
				con4 : memory[num][3] = $scope.assembler.decimalToHex(temp[num][3], 1)
			});
		};

		if ($scope.varlength != 0) {
			if(memoryhasran == false){
				$scope.memory = [];
				for ( var i = $scope.varlength; i < 256; i++) {
					$scope.addmemory(i);
				}
				memoryhasran = true;
			}
		}

		for ( var i = 0; i < $scope.varlength; i++) {
			$scope.addvars(i);
		}

		if ($scope.assembler.varMemory.length > $scope.assembler.varRegister.length) {
			for ( var i = 0; i < $scope.assembler.varMemory.length; i++) {
				$scope.addVarMemory();
				if ($scope.assembler.varRegister[i] != null) {
					$scope.addVarRegister();
				}
			}
		} else {
			for ( var i = 0; i < $scope.assembler.varRegister.length; i++) {
				$scope.addVarRegister();
				if ($scope.assembler.varMemory[i] != null) {
					$scope.addVarMemory();
				}
			}
		}

		for ( var i = 0; i < 16; i++) {
			$scope.addRegister(i);
		}

		if (updateCounter) {
			var counter = $scope.assembler.returncounter();
			previousCounter = counter;
			$scope.counter = [ {
				content : counter
			} ];
			$scope.instructionRegister = [ {
				con1 : memory[counter][0] = $scope.assembler.decimalToHex(temp[counter][0], 1),
				con2 : memory[counter][1] = $scope.assembler.decimalToHex(temp[counter][1], 1),
				con3 : memory[counter][2] = $scope.assembler.decimalToHex(temp[counter][2], 1),
				con4 : memory[counter][3] = $scope.assembler.decimalToHex(temp[counter][3], 1)
			} ];
		}

	};


	// Simplified version to update memory display
	// Only updates loations that have been changed.
	$scope.updateMemory = function() {
		var temp = $scope.assembler.memory; // Grab current memory
		var memTable = document.getElementById(/*unique memory identifier*/); // Grab current memory display
		var altered = $scope.assembler.returnStoreFlag();
		if(altered) { // Determine if memory has been changed
			var index = $scope.assembler.returnAltMemIndex(); // If true, return where it was changed
			memTable[index][0].firstChild.nodeValue = $scope.assembler.decimalToHex(temp[index][0], 1);  // Update
			memTable[index][1].firstChild.nodeValue = $scope.assembler.decimalToHex(temp[index][1], 1);  // Update
			memTable[index][2].firstChild.nodeValue = $scope.assembler.decimalToHex(temp[index][2], 1);  // Update
			memTable[index][3].firstChild.nodeValue = $scope.assembler.decimalToHex(temp[index][3], 1);  // Update
		}
	};

	$scope.buttonColor = function(button) {
		if (button == "Run") {
			return 'btn btn-success';
		} else if (button == "Walk") {
			return 'btn btn-warning';
		} else if (button == "Pause") {
			return 'btn btn-warning :hover';
		} else if (button == "Reset") {
			return 'btn btn-danger';
		}
	};

	$scope.architecture(true);

	$scope.pause = function() {
		// $scope.assembler.pause();
		$scope.architecture(true);
		$interval.cancel(intervalId);
	};

	$scope.reset = function() {
		$scope.assembler.reset();
		$scope.architecture(true);
		$interval.cancel(intervalId);
		running = false;

	};

	$scope.walk = function() {
		if(edited) {
			console.log("It's been edited.");
			var temp = $scope.assembler.preprocessor();
			if($scope.assembler.complete){
				var tem = $scope.assembler.init();
				hasRan = false;
				memoryhasran = false;
				$scope.architecture(true);
			} else {
				//alert to user
				$interval.cancel(intervalId);
				hasRan = false;
				attemptingToRun = false;
				runText = "Run";
				walkText = "Walk";
				$scope.buttons();
			}
		} else {
			$scope.done = $scope.assembler.done;
			running = true;
			// $scope.memory[counter].set_color(1);
			$scope.architecture(true);
			if (hasRan) {
				var temp = $scope.assembler.reset();
				hasRan = false;
			} else if ($scope.assembler.stop == false) {
				var temp = $scope.assembler.walk();
			} else {
				$interval.cancel(intervalId);
				// console.log("I've stopped!");
				hasRan = true;
				attemptingToRun = false;
				runText = "Run";
				walkText = "Walk";
				$scope.buttons();
			}
			$scope.architecture(false);
		}
		return 0;
	};

	$scope.run = function() {
		if (!attemptingToRun) {
			running = true;
			//$scope.assembler.run();
			$scope.architecture(true);
			intervalId = $interval($scope.walk, 200);
			// console.log("Run has been called!");
		}
	};

	$scope.buttons = function() {
		$scope.runText = runText;
		$scope.walkText = walkText;
	};

	$scope.buttons();

	$scope.runButton = function() {
		if (attemptingToRun) {
			$scope.pause();
			runText = "Run";
			walkText = "Walk";
			$scope.buttons();
			attemptingToRun = false;
		} else {
			runText = "Pause";
			walkText = "Reset";
			$scope.buttons();
			$scope.run();
			attemptingToRun = true;
		}
	};

	$scope.walkButton = function() {
		if (!attemptingToRun) {
			var rButton = document.getElementById('runButton');
			var wButton = document.getElementById('walkButton');
			rButton.disabled = true;
			wButton.disabled = true;
			var temp = $scope.walk();
			rButton.disabled = false;
			wButton.disabled = false;
		} else {
			$scope.reset();
			runText = "Run";
			walkText = "Walk";
			$scope.buttons();
			attemptingToRun = false;
		}
	};

	});
}
// vim: ts=4 sw=4 noet nolist
