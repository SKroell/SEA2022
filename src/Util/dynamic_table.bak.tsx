import $ from 'jquery';

export class DynamicTable {

  tableId: string;
  table: JQuery<HTMLElement>;
  fields: string[] | null;
  headers: string[] | null;
  defaultText: string;

  constructor(tableId: string, fields: string[], headers: string[], defaultText: string) {
    this.tableId = tableId;
    this.table = $('#' + tableId);
    this.fields = fields || null;
    this.headers = headers || null;
    this.defaultText = defaultText || 'No items to list...';
    this.setHeaders();
    this.setNoItemsInfo()
  }

  /** Builds the row with columns from the specified names. 
   *  If the item parameter is specified, the memebers of the names array will be used as property names of the item; otherwise they will be directly parsed as text.
   */
  buildRowColumns(names: any, item: any) {
    var row = '<tr>';
    if (names && names.length > 0) {
      $.each(names, function (index, name) {
        var c = item ? item[name + ''] : name;
        row += '<td>' + c + '</td>';
      });
    }
    row += '</tr>';
    return row;
  }

  /** Builds and sets the headers of the table. */
  setHeaders() {
    // if no headers specified, we will use the fields as headers.
    this.headers = (this.headers == null || this.headers.length < 1) ? this.fields : this.headers;
    var h = this.buildRowColumns(this.headers, undefined);
    if (this.table.children('thead').length < 1) this.table.prepend('<thead></thead>');
    alert(JSON.stringify(this.table));
    this.table.children('thead').html(h);
  }

  setNoItemsInfo() {
    if (this.table.length < 1) return; //not configured.
    var colspan = this.headers != null && this.headers.length > 0 ?
      'colspan="' + this.headers.length + '"' : '';
    var content = '<tr class="no-items"><td ' + colspan + ' style="text-align:center">' +
      this.defaultText + '</td></tr>';
    if (this.table.children('tbody').length > 0)
      this.table.children('tbody').html(content);
    else this.table.append('<tbody>' + content + '</tbody>');
  }

  removeNoItemsInfo() {
    var c = this.table.children('tbody').children('tr');
    if (c.length === 1 && c.hasClass('no-items')) this.table.children('tbody').empty();
  }

  /** Loads the specified data to the table body. */
  load(data: any, append: any) {
    if (this.table.length < 1) return; //not configured.
    this.setHeaders();
    this.removeNoItemsInfo();
    if (data && data.length > 0) {
      var rows = '';
      $.each(data, function (index, item) {
        rows += this.buildRowColumns(this.fields, item);
      });
      this.table.children('tbody')[append ? 'append' : 'html'](rows);
    }
    else {
      this.setNoItemsInfo();
    }
    return this;
  }

  /** Clears the table body. */
  clear() {
    this.setNoItemsInfo();
  }

  render() {
    return this.table;
  }
};

