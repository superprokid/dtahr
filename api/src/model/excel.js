const ExcelJS = require('exceljs');
const fs = require('fs');
const logger = require('../common/logger');

const FIRST_INDEX_EXCEL = 1;

const borderStyle = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" }
}

class Excel {
    // direction
    static TOP_TO_BOTTOM = 0;
    static BOTTOM_TO_TOP = 1;
    static LEFT_TO_RIGHT = 2;
    static RIGHT_TO_LEFT = 3;

    //font
    static FONT_RED = {
        name: 'Meiryo UI',
        color: { argb: 'FFFF0000' },
        size: 11,
    }
    static FONT_BLACK = {
        name: 'Meiryo UI',
        color: { argb: 'FF000000' },
        size: 11,
    }
    static FONT_HEADER = {
        name: 'Meiryo UI',
        size: 11,
        bold: true,

    }

    /**
     * Constructor of Class Excel
     * @param templatePath
     */
    constructor(templatePath) {
        this.templatePath = templatePath
        this.workbook = new ExcelJS.Workbook();
    }

    /**
     * Open file xlsx with exportPath
     */
    async open() {
        try {
            await this.workbook.xlsx.read(fs.createReadStream(this.templatePath));
        } catch (error) {
            logger.error('[server] open file excel error : ' + error);
            throw error;
        }
        
    }

    /**
     * Close and save file xlsx with exportPath for save if need test
     * Get stream of exported excel
     */
    async save(exportPath) {
        try {
            await this.workbook.xlsx.write(fs.createWriteStream(exportPath))

        } catch (error) {
            logger.error('[server] write file excel error : ' + error);
            throw error;
        }
    }
        
    /**
     * Get stream of exported excel 
     */
    async getFile() {
        return await this.workbook.xlsx.writeBuffer();
    }

    /**
     * Close and delete file
     */
    close(exportPath) {
        try {
            if (fs.existsSync(exportPath)) {
                fs.unlinkSync(exportPath);
            }
        } catch (error) {
            logger.error('[server] close file excel error : ' + error);
        }
    }

    /**
     * Write data into file xlsx with exportPath
     * @param {any[]} data
     * @param {ExcelJS.Worksheet} worksheet
     * @param {Number} rowStart start from 1
     * @param {Number} columnStart start from 1
     * @param {Number} direction
     * @param {Boolean} isSeprate true if need to write by each cell
     * @param {any} font
     */
    write(data, worksheet, rowStart, columnStart, direction, isSeprate, font) {
        // if rowStart, columnStart is invalid or worksheet is null
        if (rowStart < FIRST_INDEX_EXCEL || columnStart < FIRST_INDEX_EXCEL || !worksheet) {
            logger.error('[server] write file excel error : Invalid index');
            return;
        }

        switch (direction) {
            case Excel.TOP_TO_BOTTOM:
                if (isSeprate) {
                    this.#writeCellsFromTopToBottom(data, worksheet, rowStart, columnStart, font);
                } else {
                    this.#writeFromTopToBottom(data, worksheet, rowStart, columnStart, font);
                }
                break;
            case Excel.BOTTOM_TO_TOP:
                if (isSeprate) {
                    this.#writeCellsFromBottomToTop(data, worksheet, rowStart, columnStart, font);
                } else {
                    this.#writeFromBottomToTop(data, worksheet, rowStart, columnStart, font);
                }
                break;
            case Excel.LEFT_TO_RIGHT:
                if (isSeprate) {
                    this.#writeCellsFromLeftToRight(data, worksheet, rowStart, columnStart, font);
                } else {
                    this.#writeFromLeftToRight(data, worksheet, rowStart, columnStart, font);
                }
                break;
            case Excel.RIGHT_TO_LEFT:
                if (isSeprate) {
                    this.#writeCellsFromRightToLeft(data, worksheet, rowStart, columnStart, font);
                } else {
                    this.#writeFromRightToLeft(data, worksheet, rowStart, columnStart, font);
                }
                break;
            default:
                break;
        }
    }

    /**
     * Write data to one cell into file xlsx with exportPath
     * @param {any[]} data
     * @param {ExcelJS.Worksheet} worksheet
     * @param {Number} row
     * @param {Number} column
     * @param {*} font font of cell if exist
     */
    writeCell(value, worksheet, row, column, font) {
        // if rowStart and columnStart is invalid
        if (row < FIRST_INDEX_EXCEL || column < FIRST_INDEX_EXCEL) {
            logger.error('[server] write file excel error : Invalid index');
            return;
        }

        if (value === null) {
            return;
        }

        let cell = worksheet.getRow(row).getCell(column);
        cell.value = value;

        if (font) {
            const currentBorder = cell.border;
            cell.style = {};
            cell.font = font;
            cell.border = currentBorder;
        }
    }

    /**
     * Write data for all sheet in workbook
     * @param {any} data 
     * @param {Number} rowStart start from 1
     * @param {Number} columnStart start from 1
     * @param {Number} direction 
     * @param {Boolean} isSeprate true if need to write by each cell
     * @param {*} font font of cell if exist
     * @returns 
     */
    writeAllSheet(data, rowStart, columnStart, direction, isSeprate, font) {
        this.workbook.eachSheet((worksheet, sheetId) => {
            this.write(data, worksheet, rowStart, columnStart, direction, isSeprate, font);
        })
    }

    /**
     * Write file excel from top to bottom
     * @param {any[]} data
     * @param {ExcelJS.Worksheet} worksheet
     * @param {Number} rowStart
     * @param {Number} columnStart
     * @param {*} font font of cell if exist
     */
    #writeFromTopToBottom(data, worksheet, rowStart, columnStart, font) {
        const emptyArray = new Array(rowStart - 1).fill(null);
        data = [...emptyArray, ...data];
        let column = worksheet.getColumn(columnStart);
        column.style = {};
        column.values = data
        column.font = font;
    }

    /**
     * Write file excel from bottom to top
     * @param {any[]} data
     * @param {ExcelJS.Worksheet} worksheet
     * @param {Number} rowStart
     * @param {Number} columnStart
     * @param {*} font font of cell if exist
     */
    #writeFromBottomToTop(data, worksheet, rowStart, columnStart, font) {
        // Data will be lose if rowStart < length of data
        if (rowStart >= data.length) {
            rowStart -= data.length;
            const emptyArray = new Array(rowStart).fill(null);
            data = [...data, ...emptyArray];
        } else {
            data.splice(rowStart);
        }
        let column = worksheet.getColumn(columnStart);
        column.values = data.reverse();
        column.style = {};
        column.font = font;
    }

    /**
     * Write file excel from left to right
     * @param {any[]} data
     * @param {ExcelJS.Worksheet} worksheet
     * @param {Number} rowStart
     * @param {Number} columnStart
     */
    #writeFromLeftToRight(data, worksheet, rowStart, columnStart, font) {
        const emptyArray = new Array(columnStart - 1).fill(null);
        data = [...emptyArray, ...data];
        let row = worksheet.getRow(rowStart);
        row.values = data;
        row.font = font;
    }

    /**
     * Write file excel from right to left
     * @param {any[]} data
     * @param {ExcelJS.Worksheet} worksheet
     * @param {Number} rowStart
     * @param {Number} columnStart
     * @param {*} font font of cell if exist
     */
    #writeFromRightToLeft(data, worksheet, rowStart, columnStart, font) {
        // Data will be lose if columnStart < length of data
        if (columnStart >= data.length) {
            columnStart -= data.length;
            const emptyArray = new Array(columnStart).fill(null);
            data = [...data, ...emptyArray];
        } else {
            data.splice(columnStart);
        }
        let row = worksheet.getRow(rowStart)
        row.values = data.reverse();
        row.font = font;
    }

    /**
     * Write file excel from top to bottom by each cell
     * @param {any[]} data
     * @param {ExcelJS.Worksheet} worksheet
     * @param {Number} rowStart
     * @param {Number} columnStart
     * @param {*} font font of cell if exist
     */
    #writeCellsFromTopToBottom(data, worksheet, rowStart, columnStart, font) {
        data.forEach(value => {
            if (value === null) {
                rowStart++;
                return;
            }
            let cell = worksheet.getRow(rowStart).getCell(columnStart);
            const currentBorder = cell.border;
            cell.value = value;
            cell.style = {};
            cell.font = font;
            cell.border = currentBorder
            rowStart++;
        })
    }

    /**
     * Write file excel from bottom to top by each cell
     * @param {any[]} data
     * @param {ExcelJS.Worksheet} worksheet
     * @param {Number} rowStart
     * @param {Number} columnStart
     * @param {*} font font of cell if exist
     */
    #writeCellsFromBottomToTop(data, worksheet, rowStart, columnStart, font) {
        data.forEach(value => {
            if (value === null) {
                rowStart--;
                return;
            }
            let cell = worksheet.getRow(rowStart).getCell(columnStart);
            const currentBorder = cell.border;
            cell.value = value;
            cell.style = {};
            cell.font = font;
            cell.border = currentBorder;
            // row index should be greater than 0
            if (rowStart > FIRST_INDEX_EXCEL) {
                rowStart--;
            }
        })
    }

    /**
     * Write file excel from left to right by each cell
     * @param {any[]} data
     * @param {ExcelJS.Worksheet} worksheet
     * @param {Number} rowStart
     * @param {Number} columnStart
     * @param {*} font font of cell if exist
     */
    #writeCellsFromLeftToRight(data, worksheet, rowStart, columnStart, font) {
        let row = worksheet.getRow(rowStart);
        data.forEach(value => {
            if (value === null) {
                columnStart++;
                return;
            }
            let cell = row.getCell(columnStart);
            const currentBorder = cell.border;
            cell.value = value;
            cell.style = {};
            cell.font = font;
            cell.border = currentBorder;
            columnStart++;
        })
    }

    /**
     * Write file excel from right to left by each cell
     * @param {any[]} data
     * @param {ExcelJS.Worksheet} worksheet
     * @param {Number} rowStart
     * @param {Number} columnStart
     * @param {*} font font of cell if exist
     */
    #writeCellsFromRightToLeft(data, worksheet, rowStart, columnStart, font) {
        let row = worksheet.getRow(rowStart);
        data.forEach(value => {
            if (value === null) {
                columnStart--;
                return;
            }
            let cell = row.getCell(columnStart);
            const currentBorder = cell.border;
            cell.value = value;
            cell.style = {};
            cell.font = font;
            cell.border = currentBorder;
            // column index should be greater than 0
            if (columnStart > FIRST_INDEX_EXCEL) {
                columnStart--;
            }
        })
    }

    /**
     * Get Worksheet by name
     * Create new Worksheet if not exist
     * @param {String} sheetName
     * @returns
     */
    getWorkSheet(sheetName) {
        try {
            let worksheet = sheetName ? this.workbook.getWorksheet(sheetName) : this.workbook.getWorksheet(FIRST_INDEX_EXCEL);
            // if worksheet with sheetName is not exist
            if (!worksheet) {
                worksheet = this.workbook.addWorksheet(sheetName);
            }
            return worksheet;
        } catch (error) {
            logger.error('[server] get worksheet error : ' + error);
            return null;
        }
    }

    /**
     * Add border in range of cells
     * @param {any[]} rows
     */
    addBorderStyleRange(rows) {
        rows.forEach(cell => {
            const font = cell.font;
            cell.style = {};
            cell.border = borderStyle;
            cell.font = font;
        })
    }

    /**
     * Get range of cells
     * @param {ExcelJS.Worksheet} worksheet
     * @param {Number} rowStart top-left of range
     * @param {Number} columnStart top-left of range
     * @param {Number} rowEnd bottom-right of range
     * @param {Number} columnEnd bottom-right of range
     * @returns array of cells
     */
    getRange(worksheet, rowStart, columnStart, rowEnd, columnEnd) {
        if (rowStart < FIRST_INDEX_EXCEL || columnStart < FIRST_INDEX_EXCEL) {
            logger.error('[server] write file excel error : Invalid index');
            return;
        }

        let cells = [];
        for (let i = rowStart; i <= rowEnd; i++) {
            for (let j = columnStart; j <= columnEnd; j++) {
                cells.push(worksheet.getRow(i).getCell(j));
            }
        }
        return cells;
    }

    /**
     * Format width fit content of column in sheet
     * @param {ExcelJS.Worksheet} workSheet
     * @param {Array[{column: String || Number, width: Number}]} listObject
     */
    formatWidth(workSheet, listObject) {
        try {
            for (const obj of listObject) {
                workSheet.getColumn(obj.column).width = obj.width
            }
        } catch (ex) {
            logger.error(`[server] format columns width error: ${ex.stack}`);
        }
    }

    /**
     * Format Number in range of cells
     * @param {Array} rows 
     */
    formatNumber(rows) {
        rows.forEach(cell => {
            const valueString = cell.value + "";
            // value is a number -> align right
            if (!isNaN(valueString) && valueString !== null) {
                cell.alignment = { vertical: 'middle', horizontal: 'right' };
            }
            // if a number must be written as string (align left, ex: -24.9 in header)
            if (valueString?.charAt(0) === '\'') {
                cell.value = valueString.replace('\'', '');
            }
        })
    }

    /**
     * Fill range of cells with color
     * @param {ExcelJS.Worksheet} workSheet
     * @param {Array} cells
     * @param {string} rgbColor RGB color string. ex: d8d8d8
     */
    fillColorCells(workSheet, cells, rgbColor) {
        if (!rgbColor) {
            return;
        }
        cells.map(cell => {
            workSheet.getCell(cell).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: rgbColor }
            };
        })
    }
}

module.exports = Excel;