import React, { Component } from 'react'

const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th>Reaction Times history</th>
        </tr>
        </thead>
    )
}

const TableBody = props => {
    const rows = props.timeList.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row} ms</td>
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}

class Table extends Component {
    render() {
        const timeList  = this.props.timeList;
        return (
            <table>
                <TableHeader />
                <TableBody timeList={timeList}/>
            </table>
        )
    }
}

export default Table