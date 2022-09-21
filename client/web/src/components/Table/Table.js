export default {
    props: {
        /**
         * @binding {string} tableHeight: Height of table
         * @value unit: vh, %, px.
         */
        tableHeight: {
            type: String,
            required: true
        },
        /**
         * @binding {Array} tableHeader: List of Table header label
         */
        tableHeader: {
            type: Array,
            required: true,
        },
        /**
         * @binding {Array} tableBody: List of Table body
         */
        tableBody: {
            type: Array,
            required: true,
        },
        /**
         * @binding {boolean} sortBy : name of property to sort
         */
        sortBy: {
            type: String,
            default: '',
        },
        /**
         * @binding {string} selectType: Type of select table
         * @value single : Alow Single Select
         * @value multiple : Alow Multiple Select
         * using with editable
         */
        selectType: {
            type: String,
            default: null,
            // The selectType must match one of 'single', 'multiple' string
            validator(selectType) {
                return ['single', 'multiple'].indexOf(selectType) !== -1
            }
        },
        /**
         * @binding {boolean} editable: Check table is ediable or not
         * @value true: table is editable
         * @value false: table is not editable
         * using with selectType
         */
        isEditable: {
            type: Boolean,
            default: false
        },

    },

    data() {
        return {
            /**
             *  Array of rows data which is selected
             */
            selectedRows: [],
        }
    },
    mounted() {
        try {
            this._validateTableData()
        } catch (error) {
            console.log(error.message);
        }

        try {
            this._validateSortBy()
        } catch (error) {
            console.log(error.message);
        }
    },

    methods: {
        /**
         * @todo Validate props tableHeader and tableBody
         * If tableHeader and tableBody record do not match --> Throw error
         */
        _validateTableData() {
            if (this.tableHeader && this.tableBody && this.tableHeader.length !== Object.keys(this.tableBody[0]).length) {
                throw new Error('tableHeader and tableBody record do not match. Please check length of tableHeader and tableBody record')
            }
        },
        /**********************************
         * @todo Validate: sortBy must match tabbleBody record keys
         **********************************/
        _validateSortBy() {
            if (this.sortBy && this.tableBody && Object.keys(this.tableBody[0]).indexOf(this.sortBy) === -1) {
                throw new Error('sortBy must match tabbleBody record keys. Please check props sortBy')
            }
        },
        /**
         * @todo Change row state to enable or disable editing each check or uncheck
         * @todo Get selected row data
         * @todo Send edited data to parent
         * @param {object} items : {[array1], [array2] ...}
         */
        selectTableRow(items) {
            // Change row state
            this._changeRowState(this.selectedRows, items);
            // Get selected row data

            this.selectedRows = items;
            // Send data to parent
            this.sendEditedData(this.selectedRows)
        },
        /**********************************
         * @todo Change row state to enable or disable to edit using $ref
         * @param {array} oldDatas: array of row data objects before checking or unchecking
         * @param {array} newDatas: array of row data objects after checking or unchecking
         **********************************/
        _changeRowState(oldDatas, newDatas) {
            // let changedRowId = this._getChangedRowId(oldDatas, newDatas)
            console.log(oldDatas,newDatas)
            // Enable row to edit   
            // if (changedRowId.newlyCheckedRowId) {
            //     let property = 'tableInput' + changedRowId.newlyCheckedRowId
            //     this.$refs[property].map((data) => {
            //         data.disabled = false;
            //     })
            // }
            // // Disable row
            // else if (changedRowId.newlyUncheckedRowId) {
            //     let property = 'tableInput' + changedRowId.newlyUncheckedRowId
            //     this.$refs[property].map((data) => {
            //         data.disabled = true;
            //     })
            // }
        },

        /**********************************
         * @todo: Get row id from array of row datas
         * @param {array} rowDatas: array of row data objects
         * @return {array} rowId
         **********************************/
        _getRowIds(rowDatas) {
            let rowId = [];
            rowDatas.map((rowData) => {
                rowId.push(rowData.id)
            })
            return rowId
        },

        /**********************************
         * @todo: Get ID of the newly unchecked row
         * @param {array} oldDatas: array of row data objects before checking or unchecking
         * @param {array} newDatas: array of row data objects after checking or unchecking
         * @return {object} changedRowId: {newlyUncheckedRowId: string, newlyCheckedRowId: string}
         * newlyUncheckedRowId : ID of the newly unchecked row, using to disable row when unchecking row
         * newlyCheckedRowId: ID of the newly checked row, using to enable row when checking row
         **********************************/
        _getChangedRowId(oldDatas, newDatas) {
            let oldDatasIds = this._getRowIds(oldDatas);
            let newDatasIds = this._getRowIds(newDatas);
            let newlyCheckedRowId = newDatasIds.find(id => oldDatasIds.indexOf(id) === -1);
            let newlyUncheckedRowId = oldDatasIds.find(id => newDatasIds.indexOf(id) === -1);

            let changedRowId = {
                newlyUncheckedRowId: newlyUncheckedRowId,
                newlyCheckedRowId: newlyCheckedRowId
            }

            return changedRowId
        },
        /**
         * Send edited data to parent
         */
        sendEditedData(data) {
            this.$emit('edit-table', data);
        }
    }

}