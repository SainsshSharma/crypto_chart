/* eslint-disable react/prop-types */

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Paper from "@mui/material/Paper";

const Tables = ({ data,curr }) => {
  

console.log(data)
  return (
    <div>
      <TableContainer component={Paper} sx={{width:505,height:500}}>
        <Table sx={{ minWidth: 200}} aria-label="simple table" >
          <TableHead sx={{background:"#4B40EE",color:"white"}}>
            <TableRow >
              <TableCell sx={{color:"white",fontSize:18}}>{curr.toUpperCase()}</TableCell>
              <TableCell align="right" sx={{color:"white",fontSize:18}}>Open</TableCell>
              <TableCell align="right" sx={{color:"white",fontSize:18}}>High</TableCell>
              <TableCell align="right" sx={{color:"white",fontSize:18}}>Low</TableCell>
              <TableCell align="right" sx={{color:"white",fontSize:18}}>Closing</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((result, key) => 
               (
                <TableRow
                  key={key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >                    
                  <TableCell component="th" scope="row" sx={{fontSize:18,color:"#6F7177"}}>
                    {curr.toUpperCase()}
                  </TableCell>
                  <TableCell align="right" sx={{fontSize:18,color:"#6F7177"}}>{result[1]}$</TableCell>
                  <TableCell align="right" sx={{fontSize:18,color:"#6F7177"}}>{result[2]}$</TableCell>
                  <TableCell align="right" sx={{fontSize:18,color:"#6F7177"}}>{result[3]}$</TableCell>
                  <TableCell align="right" sx={{fontSize:18,color:"#6F7177"}}>{result[4]}$</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tables;

