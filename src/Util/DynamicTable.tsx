import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

type TableProps = {
  tableId: string;
  fields: string[] | null;
  headers: string[] | null;
  defaultText: string;
  data?: any
  accepting: boolean;
  onExecute?: Function;
}

class DynamicTable extends React.Component<any, any> {

  constructor(props: TableProps) {
    super(props);
    this.state = {
      tableId: props.tableId,
      fields: props.fields,
      headers: props.headers,
      defaultText: props.defaultText,
    };
  }

  componentDidUpdate(prevProps: TableProps) {
    if(prevProps.data !== this.props.data) {
      this.setState({data: this.props.value});
    }
  }

  /** Builds and sets the headers of the table. */
  setHeaders() {
    // if no headers specified, we will use the fields as headers.
    var headers = (this.props.headers === null || this.props.headers.length < 1) ? this.props.fields : this.props.headers;
    return (
      <TableHead>
        <TableRow>
          {/* map headers */}
          {headers.map((header: string, index: number) => {
            return (
                <TableCell key={index}>{header}</TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    )
  }

  setBody() {
    // Cleanup props
    var status = this.props.data
    for (var row of status)
    {
        row.executed = (row.executed ? "V:" + row.lastExecuted : "");     
        row.pending = (row.pending ? "!" + (row.deadline === undefined ? "" : ":" + row.deadline) : "");            
        row.included = (row.included ? "" : "%");       
    }

    return(
      <TableBody>
        {/* map rows */}
        {(status != null && status.length > 0) ?
           status.map ((row: any, index: number) => {
            return (
              <TableRow key={index}>
                {/* map columns */}
                {this.props.fields.map((field: string, index: number) => {
                  if(field==="name") return <> </>;
                  return (
                    <TableCell>{row[field].toString()}</TableCell>
                  );
                })}
                  <TableCell>
                    <Button variant="outlined"
                            onClick={() => this.props.onExecute(row.name)}
                            disabled={row.enabled === false}
                    >{row["name"]}</Button>
                    </TableCell>
              </TableRow>
            );
          })
          : <TableCell>No items to list...</TableCell>}
      </TableBody>
    )
  }
  
  render() {
    return (
      <>
      <Table>
        {this.setHeaders()}
        {this.setBody() }
      </Table>
      {this.props.accepting
        ? <Alert severity="success">ACCEPTING</Alert>
        : <Alert severity="error">NOT ACCEPTING</Alert>        
      }
      </>
    )
  }

  
}

export default DynamicTable;
