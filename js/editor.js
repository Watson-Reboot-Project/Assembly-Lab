/*
 * This code is for the Watson Graphics Lab editor.
 */
var figNum=0;
var codeTable = document.getElementById("editor0");
//The current selected row
var selRow = 0;
// Blank template for unselected row
var blank = "&nbsp;&nbsp;&nbsp;&nbsp;";
// arrow template for selected row
var arrow = "&#8594;";
// Indentation used for inside brackets
var indent = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
// Template used for a newly added row in the codeTable
var innerTableTemplate = "<table class='innerTable" + figNum + "'"
		+ "><tr><td class='codeTd'>" + blank + "</td><td class='codeTd'>" + "*"
		+ "&nbsp;&nbsp;</td></tr></table>";
var wordTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td>&lsaquo;label&rsaquo;</td>\
	<td class ='keyword'>.WORD</td>\
	<td class ='constant'>&lsaquo;const&rsaquo;,</td>\
	<td></td>\
	<td></td></tr>";
var blockTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td>&lsaquo;label&rsaquo;</td>\
	<td class ='keyword'>.BLOCK</td>\
	<td class ='constant'>&lsaquo;const&rsaquo;,</td>\
	<td></td>\
	<td></td></tr>";
var loadIMMTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td></td>\
	<td class='command'>LOADIMM</td>\
	<td class='VarChooser'>&lsaquo;reg&rsaquo;,</td>\
	<td class='constant'>&lsaquo;const&rsaquo;</td>\
	<td></td></tr>";
var loadTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td></td>\
	<td class='command'>LOAD</td>\
	<td>&lsaquo;reg&rsaquo;,</td>\
	<td>&lsaquo;label&rsaquo;</td>\
	<td></td></tr>";
var storeTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td></td>\
	<td class='command'>STORE</td>\
	<td>&lsaquo;reg&rsaquo;,</td>\
	<td>&lsaquo;label&rsaquo;</td>\
	<td></td></tr>";
var loadINDTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td></td>\
	<td class='command'>LOADIND</td>\
	<td>&lsaquo;reg&rsaquo;,</td>\
	<td>&lsaquo;reg&rsaquo;</td>\
	<td></td></tr>";
var storeINDTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td></td>\
	<td class='command'>STOREIND</td>\
	<td>&lsaquo;reg&rsaquo;,</td>\
	<td>&lsaquo;reg&rsaquo;</td>\
	<td></td></tr>";
var addTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td></td>\
	<td class='command'>ADD</td>\
	<td>&lsaquo;reg&rsaquo;,</td>\
	<td>&lsaquo;reg&rsaquo;</td>\
	<td>&lsaquo;reg&rsaquo;</td></tr>";
var subtractTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td></td>\
	<td class='command'>SUBTRACT</td>\
	<td>&lsaquo;reg&rsaquo;,</td>\
	<td>&lsaquo;reg&rsaquo;</td>\
	<td>&lsaquo;reg&rsaquo;</td></tr>";
var andTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td></td>\
	<td class='command'>AND</td>\
	<td>&lsaquo;reg&rsaquo;,</td>\
	<td>&lsaquo;reg&rsaquo;</td>\
	<td>&lsaquo;reg&rsaquo;</td></tr>";
var orTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td></td>\
	<td class='command'>OR</td>\
	<td>&lsaquo;reg&rsaquo;,</td>\
	<td>&lsaquo;reg&rsaquo;</td>\
	<td>&lsaquo;reg&rsaquo;</td></tr>";
var notTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td></td>\
	<td class='command'>NOT</td>\
	<td>&lsaquo;reg&rsaquo;,</td>\
	<td>&lsaquo;reg&rsaquo;</td>\
	<td></td></tr>";
var aslTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td></td>\
	<td class='command'>ASL</td>\
	<td>&lsaquo;reg&rsaquo;,</td>\
	<td class='constant'>&lsaquo;bits&rsaquo;</td>\
	<td></td></tr>";
var asrTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td></td>\
	<td class='command'>ASR</td>\
	<td>&lsaquo;reg&rsaquo;,</td>\
	<td class='constant'>&lsaquo;bits&rsaquo;</td>\
	<td></td></tr>";
var compareTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td></td>\
	<td class='command'>COMPARE</td>\
	<td>&lsaquo;reg&rsaquo;,</td>\
	<td>&lsaquo;reg&rsaquo;</td>\
	<td></td></tr>";
var branchTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td></td>\
	<td class='command'>BRANCH</td>\
	<td>&lsaquo;cond&rsaquo;,</td>\
	<td>&lsaquo;label&rsaquo;</td>\
	<td></td></tr>";
var jumpTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td></td>\
	<td class='command'>JUMP</td>\
	<td>&lsaquo;label&rsaquo;</td>\
	<td></td>\
	<td></td></tr>";
var haltTemplate = "<tr class='innerTable"
		+ figNum
		+ "'><td>"+blank+"</td>\
	<td>*</td>\
	<td></td>\
	<td class='command'>HALT</td>\
	<td></td>\
	<td></td>\
	<td></td></tr>";
// Template used for a newly selected row
var innerTableArrowTemplate = "<tr class='innerTable" + figNum + "'"
		+ "><td class='codeTd'>" + arrow
		+ "</td><td class='codeTd'></td></tr>";
// This identifies the current clicked element for change later on from numpad
// and variable chooser
var CurrentElement;
var currRow = 0;

init();

function init() { // Initializes variables
	var row;
	var cell;
	var innerTable;

	// Make a blank row where the program starts
	row = codeTable.insertRow(0);
	// make a new cell here
	cell = row.insertCell(0);
	// Set the cell with arrow template
	cell.innerHTML = innerTableArrowTemplate;
	// Selected row is line 2
	selRow = 0;
}

// We must refresh the events upon each change within the tables...
// toggleEvents() is called each time something is altered
function toggleEvents() {
	// Turn off mouseover event
	$('.innerTable' + figNum).off('mouseover');
	// Turn mouseover event back on
	$('.innerTable' + figNum)
			.on(
					'mouseover',
					'td',
					function() {
						// grab the hovered cell's value
						cellVal = $(this).text();
						console.log(cellVal);
						// grab the hovered cell's index
						colNum = ($(this).index());
						// grab the row number from codeTable (this is a silly
						// way of doing it, but it works)
						var rowNum = ($(this).parent().index());
						console.log(rowNum);
						// we pass rowNum and colNum to tell the function where
						// start highlighting
						if (cellVal.indexOf('=') == -1
								&& cellVal.indexOf('.WORD') == -1
								&& cellVal.indexOf('.BLOCK') == -1
								&& cellVal.indexOf('LOAD') == -1
								&& cellVal.indexOf('LOADIMM') == -1
								&& cellVal.indexOf('STORE') == -1
								&& cellVal.indexOf('LOADIND') == -1
								&& cellVal.indexOf('STOREIND') == -1
								&& cellVal.indexOf('ADD') == -1
								&& cellVal.indexOf('SUBTRACT') == -1
								&& cellVal.indexOf('AND') == -1
								&& cellVal.indexOf('OR') == -1
								&& cellVal.indexOf('NOT') == -1
								&& cellVal.indexOf('ASL') == -1
								&& cellVal.indexOf('ASR') == -1
								&& cellVal.indexOf('COMPARE') == -1
								&& cellVal.indexOf('BRANCH') == -1
								&& cellVal.indexOf('JUMP') == -1
								&& cellVal.indexOf('HALT') == -1) {
							// set cursor to pointer when hovering over
							// clickable items
							$(this).css('cursor', 'pointer');
							if (cellVal.indexOf('(') >= 0
									&& rowToString(rowNum).indexOf("draw") == -1
									&& rowToString(rowNum).indexOf("erase") == -1
									&& rowToString(rowNum).indexOf("color") == -1)
								highlightParenthesis('(', ')', rowNum, colNum);
							else if (cellVal.indexOf(')') >= 0
									&& rowToString(rowNum).indexOf("draw") == -1
									&& rowToString(rowNum).indexOf("erase") == -1
									&& rowToString(rowNum).indexOf("color") == -1)
								highlightParenthesisBackwards('(', ')', rowNum,
										colNum);
							else if (cellVal.indexOf("(") == -1
									&& cellVal.indexOf(")") == -1) {
								if (cellVal.indexOf("*") >= 0) {
									if (rowToString(rowNum).indexOf("repeat") >= 0) {
										for (var i = 0; i < codeTable.rows.length; i++) {
											if (rowToString(rowNum + i)
													.indexOf("endloop") >= 0) {
												highlightLine(rowNum + i);
												break;
											} else {
												highlightLine(rowNum + i);
											}
										}
									}
									highlightLine(rowNum);
								} else
									highlightCell(rowNum, colNum);
							}
						}
					});

	$('.innerTable' + figNum).off('mouseout');
	// we must put the cells we highlight red back to their normal state after
	// we mouseout of them
	$('.innerTable' + figNum).on('mouseout', function() {
		returnToNormalColor();
		codeTable.style.cursor = 'default';
	});

	// Turn click listener off
	$(".innerTable" + figNum).off("click");
	// Turn it back on
	$(".innerTable" + figNum)
			.on(
					"click",
					'td',
					function() {
						var cellVal = $(this).text();
						var colNum = $(this).index();
						var rowNum = ($(this).parent().index());
						var innerTable = codeTable.rows[rowNum].cells[0].children[0];
						// Delete this row if user confirms
						if (cellVal.indexOf("*") >= 0) {
							if (confirm("Are you sure you want to delete the highlited\ntext?")) {
								codeTable.deleteRow(rowNum);
								if (rowNum < selRow)
									selRow--;
							} else {
								return;
							}
						} else if ($(this).html().indexOf(blank) >= 0) {
							if (rowToString(rowNum) != "loop")
								moveToLine(rowNum);
						}
						// User clicked on variable number. Generate keypad pop
						// up
						else if ((!isNaN(Number(cellVal)) && rowToString(rowNum)
								.indexOf("repeat") == -1)
								|| cellVal == 'X') {
							CurrentElement = $(this);
							$("input.InputValue").val("");
							$("#dialog-modal-num").dialog({
								height : 280,
								width : 350,
								modal : true
							});
						}
						// User clicked on something within draw(). Generate
						// list of drawable items
						else if (rowToString(rowNum).indexOf("draw") >= 0
								&& cellVal.indexOf("draw") == -1
								&& cellVal.indexOf("(") == -1
								&& cellVal.indexOf(")") == -1) {
							// list variable stores list of items
							list = "";
							// finds all drawable shapes above the current row
							for (var i = 0; i < rowNum; i++) {
								if (rowToString(i).indexOf("=") >= 0
										&& rowToString(i).indexOf("VARIABLE") == -1)
									if (rowToString(i).substring(0,
											rowToString(i).indexOf("=")).length > 0)
										list += "<option>"
												+ rowToString(i).substring(
														0,
														rowToString(i).indexOf(
																"="))
												+ "</option>";
							}
							currRow = rowNum;
							CurrentElement = $(this);
							CreateDialogOptions(list);
							$("#dialog-modal-Vars").dialog({
								height : 280,
								width : 350,
								modal : true
							});
						} else if (rowToString(rowNum).indexOf("erase") >= 0
								&& cellVal.indexOf("(") == -1
								&& cellVal.indexOf(")") == -1) {
							list = "";
							for (var i = 0; i < rowNum; i++) {
								if (rowToString(i).indexOf("draw") >= 0
										&& rowToString(i).indexOf("OBJECT") == -1) {
									list += "<option>"
											+ rowToString(i)
													.substring(
															rowToString(i)
																	.indexOf(
																			"(") + 1,
															rowToString(i)
																	.indexOf(
																			")"))
											+ "</option>";
								}
							}
							currRow = rowNum;
							CurrentElement = $(this);
							CreateDialogOptions(list);
							$("#dialog-modal-Vars").dialog({
								height : 280,
								width : 350,
								modal : true
							});
						} else if (rowToString(rowNum).indexOf("color") >= 0
								&& cellVal.indexOf("color") == -1) {
							list = "<option>red</option>"
									+ "<option>blue</option>"
									+ "<option>green</option>"
									+ "<option>yellow</option>"
									+ "<option>orange</option>"
									+ "<option>black</option>"
									+ "<option>white</option>";
							currRow = rowNum;
							CurrentElement = $(this);
							CreateDialogOptions(list);
							$("#dialog-modal-Vars").dialog({
								height : 280,
								width : 350,
								modal : true
							});
						}
						// User clicked on the loop counter. (It could already
						// be assigned in which case it wouldn't be labeled
						// "COUNTER")
						// Make sure user isn't clicking 'repeat' or 'times'
						else if (rowToString(rowNum).indexOf("repeat") >= 0
								&& cellVal.indexOf("repeat") == -1
								&& cellVal.indexOf("times") == -1) {
							CurrentElement = $(this);
							$("input.InputValue").val("");
							$("#dialog-modal-num").dialog({
								height : 280,
								width : 350,
								modal : true
							});
						} else if (cellVal.indexOf("EXPRESSION") >= 0) {
							alert("When editing assignment\nstatements, Choose the Left\nHand Side varibale before\nattempting to specity the\n"
									+ "Right Hand Side expression");
						}
						// User clicked a variable on the left side of an
						// assignment operator
						/*else if (colNum < innerTable.rows[0].cells.length - 1)
							if (innerTable.rows[0].cells[colNum + 1].innerText
									.indexOf("=") >= 0) {
								list = "";
								for (var i = 0; i < distanceVariables.length; i++) {
									list += "<option>" + distanceVariables[i]
											+ "</option>";
								}
								for (var i = 0; i < pointVariables.length; i++) {
									list += "<option>" + pointVariables[i]
											+ "</option>";
								}
								for (var i = 0; i < lineVariables.length; i++) {
									list += "<option>" + lineVariables[i]
											+ "</option>";
								}
								for (var i = 0; i < circleVariables.length; i++) {
									list += "<option>" + circleVariables[i]
											+ "</option>";
								}
								for (var i = 0; i < polygonVariables.length; i++) {
									list += "<option>" + polygonVariables[i]
											+ "</option>";
								}
								CurrentElement = $(this);
								currRow = rowNum;
								CreateDialogOptions(list);
								$("#dialog-modal-Vars").dialog({
									height : 280,
									width : 350,
									modal : true
								});

							}*/
					});
}

// Return everything to normal color (black)
function returnToNormalColor() {
	for (var i = 0; i < codeTable.rows.length; i++) {
		var innerTable = codeTable.rows[i].cells[0].children[0];
		var numCells = codeTable.rows[i].cells.length;
		for (var j = 0; j < numCells; j++) {
			if (codeTable.rows[i].cells[j].className == 'keyword') {
				codeTable.rows[i].cells[j].style.color = "#CC0099";
			} else if (codeTable.rows[i].cells[j].className == 'comment') {
				codeTable.rows[i].cells[j].style.color = "#007500";
			} else if (codeTable.rows[i].cells[j].className == 'command') {
				codeTable.rows[i].cells[j].style.color = "#0000FF";
			} else if (codeTable.rows[i].cells[j].className == 'constant') {
				codeTable.rows[i].cells[j].style.color = "#A52A2A";
			} else {
				codeTable.rows[i].cells[j].style.color = "#000000";
			}
		}
	}
}

// move to a specified row
function moveToLine(rowNum) {
	var innerTable = codeTable.rows[selRow].cells[0].children[0];
	var newRow;
	var cell;

	if (rowNum < selRow) {
		if (selRow != codeTable.rows.length - 1)
			codeTable.deleteRow(selRow); // delete the current selected row
		else {
			codeTable.rows[0].cells[0].innerHTML = blank;
		}
		newRow = codeTable.insertRow(rowNum); // insert a new row at row
		// number specified
		cell = newRow.insertCell(0); // insert a new cell in new row just
		// created
		cell.innerHTML = innerTableArrowTemplate; // insert the innerTable
		// template with array
		selectRow(rowNum); // select newly inserted row
	} else {
		codeTable.deleteRow(selRow); // delete the current selected row
		newRow = codeTable.insertRow(rowNum - 1); // insert a new row at row
		// number specified
		cell = newRow.insertCell(0); // insert a new cell in new row just
		// created
		cell.innerHTML = innerTableArrowTemplate; // insert the innerTable
		// template with array
		selectRow(rowNum - 1); // select newly inserted row
	}
}

// Adds new row on line <line> and creates cells bases on <params> array
function addNewRow(line, params) {
	var row = codeTable.insertRow(line);
	row.className = 'innerTable' + figNum + '';
	switch (params) {
	case -2:
		row.innerHTML = blockTemplate;
		console.log(".Block");
		break;
	case -1:
		row.innerHTML = wordTemplate;
		console.log(".Word");
		break;
	case 0:
		row.innerHTML = loadIMMTemplate;
		console.log("LoadIMM");
		break;
	case 1:
		row.innerHTML = loadTemplate;
		console.log("Load");
		break;
	case 2:
		row.innerHTML = storeTemplate;
		console.log("Store");
		break;
	case 3:
		row.innerHTML = loadINDTemplate;
		console.log("LoadIND");
		break;
	case 4:
		row.innerHTML = storeINDTemplate;
		console.log("StoreIND");
		break;
	case 5:
		row.innerHTML = addTemplate;
		console.log("Add");
		break;
	case 6:
		row.innerHTML = subtractTemplate;
		console.log("Subtract");
		break;
	case 7:
		row.innerHTML = andTemplate;
		console.log("And");
		break;
	case 8:
		row.innerHTML = orTemplate;
		console.log("Or");
		break;
	case 9:
		row.innerHTML = notTemplate;
		console.log("Not");
		break;
	case 10:
		row.innerHTML = aslTemplate;
		console.log("ASL");
		break;
	case 11:
		row.innerHTML = asrTemplate;
		console.log("ASR");
		break;
	case 12:
		row.innerHTML = compareTemplate;
		console.log("Compare");
		break;
	case 13:
		row.innerHTML = branchTemplate;
		console.log("Branch");
		break;
	case 14:
		row.innerHTML = jumpTemplate;
		console.log("Jump");
		break;
	case 15:
		row.innerHTML = haltTemplate;
		console.log("Halt");
		break;
	}
	// var cell = row.insertCell(0);
	// cell.innerHTML = innerTableTemplate;
	// var innerTable = codeTable.rows[line].cells[0].children[0];
	// addRow(innerTable, params, 2);
	toggleEvents();
	selRow++;
}

// addRow() takes an innerTable, a string of cell values, and a start index and
// populates the innerTable with these values
function addRow(table, values, startInd) {
	var cell;
	console.log(values);
	// for all cells in the table
	for (var i = 0; i < values.length; i++) {
		// insert a cell at startInd
		cell = table.rows[0].insertCell(startInd++);
		// make the innerHTML of the cell cells[i]
		cell.innerHTML = values[i];
	}
}

// selectRow() selects a row with the specified rowNum
function selectRow(rowNum) {
	if (selRow != -1) { // if there is a selected row
		codeTable.rows[selRow].cells[0].firstChild.innerHTML = blank; // grab
		// the
		// innerTable
		// for
		// the
		// currently
		// selected
		// row
	}

	selRow = rowNum;
	codeTable.rows[rowNum].cells[0].innerHTML = arrow;
}

// highlight one cell red at a specific row and column
function highlightCell(rowInd, colInd) {
	console.log(rowInd);
	codeTable.rows[rowInd].cells[colInd].style.color = "#FF0000"; // grab the
	// inner
	// table at
	// the
	// specified
	// row
}

// highlightControlStructure() looks for matching braces '{' and '}'. Once the
// braces match up. it stops highlighting
function highlightLoop(rowInd, colInd) {
	var bracket = 1; // bracket found initialized to 1 so the while loops
	// executes
	var numCells; // number of cells in the current row
	var firstBrack = false; // first bracket found flag; since bracket is
	// initialized to one, the first bracket doesn't
	// count

	for (var i = rowInd; i < codeTable.rows.length; i++) { // iterate
		// throughout rows
		// starting at the
		// specified index
		var innerTable = codeTable.rows[i].cells[0].children[0]; // grab the
		// inner
		// table of
		// this row
		var numCells = innerTable.rows[0].cells.length; // grab the number of
		// cells in this row
		for (var j = 0; j < numCells; j++) { // iterate throughout these
			// cells
			if (innerTable.rows[0].cells[j].innerText.indexOf("{") >= 0) { // if
				// we
				// found
				// a
				// '{'
				if (!firstBrack)
					firstBrack = true; // if this is the first bracket, skip it
				else
					bracket++; // otherwise, count it
			} else if (innerTable.rows[0].cells[j].innerText.indexOf("}") >= 0) { // if
				// we
				// found
				// a
				// '}'
				bracket--; // subtract from bracket
			}

			innerTable.rows[0].cells[j].style.color = "#FF0000"; // color the
			// current
			// cell red
			// as we go
		}
		if (bracket == 0)
			break; // if we found matching brackets, brackets will be 0, break
	}
}

function highlightParenthesis(openBracket, closeBracket, rowInd, colInd) {
	var bracket = 1;
	var numCells;
	var firstBrack = false;
	var firstLoop = true;
	var innerTable;

	while (bracket != 0) {
		for (var i = 0; i < codeTable.rows.length; i++) {
			if (firstLoop == true)
				i = rowInd;
			innerTable = codeTable.rows[i].cells[0].children[0];
			numCells = innerTable.rows[0].cells.length
			for (var j = 0; j < numCells; j++) {
				if (firstLoop == true) {
					j = colInd;
					firstLoop = false;
				}

				if (innerTable.rows[0].cells[j].innerText.indexOf(openBracket) >= 0) {
					if (!firstBrack)
						firstBrack = true;
					else
						bracket++;
				} else if (innerTable.rows[0].cells[j].innerText
						.indexOf(closeBracket) >= 0) {
					bracket--;
				}
				innerTable.rows[0].cells[j].style.color = "#FF0000";

				if (bracket == 0)
					break;
			}

			if (bracket == 0)
				break;
		}
	}
}

function highlightParenthesisBackwards(openBracket, closeBracket, rowInd,
		colInd) {
	var bracket = 1;
	var numCells;
	var firstBrack = false;
	var firstLoop = true;
	var innerTable;

	while (bracket != 0) {
		for (var i = codeTable.rows.length - 1; i >= 0; i--) {
			if (firstLoop == true)
				i = rowInd;
			innerTable = codeTable.rows[i].cells[0].children[0];
			numCells = innerTable.rows[0].cells.length
			for (var j = numCells - 1; j >= 0; j--) {
				if (firstLoop == true) {
					j = colInd;
					firstLoop = false;
				}

				if (innerTable.rows[0].cells[j].innerText.indexOf(openBracket) >= 0) {
					bracket--;
				} else if (innerTable.rows[0].cells[j].innerText
						.indexOf(closeBracket) >= 0) {
					if (!firstBrack)
						firstBrack = true;
					else
						bracket++;
				}

				innerTable.rows[0].cells[j].style.color = "#FF0000";

				if (bracket == 0)
					break;
			}

			if (bracket == 0)
				break;
		}
	}
}

// highlightLine() simply highlights the row with the row index passed to it
function highlightLine(rowInd) {
	// grab the inner table at this index
	var innerTable = codeTable.rows[rowInd].cells[0].children[0];
	// grab the number of cells for this row
	var numCells = codeTable.rows[0].cells.length;
	// iterate throughout the cells
	for (var i = 0; i < numCells; i++) {
		// Highlight all cells red
		codeTable.rows[rowInd].cells[i].style.color = '#FF0000';
	}
}

// Returns string representation of the row at specified row index
function rowToString(rowInd) {
	var string = "";
	for (var i = 2; i < codeTable.rows[0].cells.length; i++) {
		string += codeTable.rows[rowInd].cells[i].innerText;
	}
	return string.trim();
}

function word() {
	addNewRow(selRow, -1);
}

function block() {
	addNewRow(selRow, -2);
}

function loadIMM() {
	addNewRow(selRow, 0);
}

function load() {
	addNewRow(selRow, 1);
}

function store() {
	addNewRow(selRow, 2);
}

function loadIND() {
	addNewRow(selRow, 3);
}

// Allow users to change the color of shapes
function storeIND() {
	addNewRow(selRow, 4);
}

function add() {
	addNewRow(selRow, 5);
}

function subtract() {
	addNewRow(selRow, 6);
}

function and() {
	addNewRow(selRow, 7);
}

function or() {
	addNewRow(selRow, 8);
}

function not() {
	addNewRow(selRow, 9);
}

function asl() {
	addNewRow(selRow, 10);
}

function asr() {
	addNewRow(selRow, 11);
}

function compare() {
	addNewRow(selRow, 12);
}

function branch() {
	addNewRow(selRow, 13);
}

function jump() {
	addNewRow(selRow, 14);
}

function halt() {
	addNewRow(selRow, 15);
}

// Creates a loop in program window
function loop() {
	var thisIndent = getIndent(selRow);
	addNewRow(selRow, [ thisIndent + "repeat", "COUNTER", "times" ]);
	addNewRow(selRow, [ thisIndent + "loop" ]);
	addNewRow(selRow, [ thisIndent + "endloop" ]);
}
