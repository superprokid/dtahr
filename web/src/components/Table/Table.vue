<script src="./Table.js"></script>
<style src="./Table.css"></style>

<template>
  <div class="table-component">
    <!--
       Editable table with input inside
        -->
    <div class="editable-table" v-if="isEditable">
      <md-table
        v-model="tableBody"
        :md-sort="sortBy"
        md-sort-order="asc"
        md-card
        md-fixed-header
        :md-height="tableHeight"
        @md-selected="selectTableRow"
      >
        <!-- 
      md-selectable: Condition that checkbox is available on table
      md-auto-select: Condition that be able to check by clicking on table field
     -->
        <md-table-row
          slot="md-table-row"
          slot-scope="{ item }"
          :md-selectable="selectType"
        >
          <!-- 
        Loop table cell
        Object.keys(item)[index]: get match item key with tableHeader
       -->
          <md-table-cell
            v-for="(label, index) in tableHeader"
            :key="index"
            :md-label="label"
            :md-sort-by="Object.keys(item)[index]"
          >
            <input
              class="table-input"
              v-model="item[Object.keys(item)[index]]"
              disabled
              :ref="'tableInput' + item.id"
            />
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>

    <!--
       Uneditable table  
       -->
    <div class="uneditable-table" v-if="!isEditable">
      <md-table
        v-model="tableBody"
        :md-sort="sortBy"
        md-sort-order="asc"
        md-card
        :md-height="tableHeight"
        @md-selected="selectTableRow"
      >
        <!-- 
      md-selectable: Condition that checkbox is available on table
      md-auto-select: Condition that be able to check by clicking on table field
     -->
        <md-table-row
          slot="md-table-row"
          slot-scope="{ item }"
          :md-selectable="selectType"
        >
          <md-table-cell
            v-for="(label, index) in tableHeader"
            :key="index"
            :md-label="label"
            :md-sort-by="Object.keys(item)[index]"
          >
            {{ item[Object.keys(item)[index]] }}
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>
