import React from 'react';
import './style.less';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Card, Space } from 'antd';

class ShareholderInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataCfg: [],
      options: null,
      themeCfg: null
    }
  }

  async componentDidMount() {
    // await fetch ('/api/borrower/get_shareholder_preson_message', {
    //     method: 'POST',
    //     headers: new Headers({'content-type': 'application/json'}),
    //     body: JSON.stringify({
    //         mode: 'getpersonmessage'
    //     })
    // })
    // .then (res => res.json())
    // .then (data => {
    //     this.setState({ dataCfg: data.data })
    // })
    await fetch('/json/shareholder_preson.json', {
      method: 'GET',
    })
    .then (res => res.json())
    .then (data => {
        // console.log(data)
        this.setState({ dataCfg: data })
    })
  }

  render() {
    return (
      <div>
        {
          this.state.dataCfg.map((group) => {
            return (
            <Card 
            title={group[0]}
            bordered={false} 
            headStyle={{
                fontSize: '1.2em',
                color: '#096dd9',
                fontWeight: 'bold',
            }}>
              <Space direction="vertical" size="middle">
                {group[1].map((tb) => {
                  return (
                  <Table sx={{ minWidth: 700}} size='small'>
                    <TableHead>
                      <TableRow>
                        { tb[0].map((cell)=> {
                          return (<TableCell sx={{ fontWeight: "bold", fontSize: 14}} align={cell.align} rowSpan={cell.rowSpan} colSpan={cell.colSpan}>{cell.info}</TableCell>)
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        tb.slice(1,).map((row, i) => {
                          return (
                            <TableRow key={i}>
                              {
                                row.map((cell) => {
                                  return (<TableCell sx={{ fontSize: 14}} align={cell.align} rowSpan={cell.rowSpan} colSpan={cell.colSpan}> {cell.info} </TableCell>)
                                })
                              }
                            </TableRow>
                          )
                        })
                      }
                    </TableBody>
                  </Table>
                  )
                })}
              </Space>
            </Card>
            )
          })
        }
      </div>
    )
  };
};

export default ShareholderInfo;