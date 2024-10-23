import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { FlagCellRenderer } from './CellRenderers/FlagCellRenderer';
import DataGridStyles from './DataGridStyles.module.scss';
import './CustomStyles.css';
import 'ag-grid-enterprise';

const currency = import.meta.env.VITE_CURRENCY;

const formatIncome = (amount) =>
  new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'eb-GB', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount.value);

const degreeCellRenderer = (params) => {
  if (params.value === undefined) return;
  return (
    <span className={DataGridStyles.missionSpan}>
      {
        <img
          alt={`${params.value}`}
          src={`https://www.ag-grid.com/example-assets/icons/${
            params.value ? 'tick-in-circle' : 'cross-in-circle'
          }.png`}
          className={DataGridStyles.missionIcon}
        />
      }
    </span>
  );
};

const totalYesTotalNoAggFunc = (params) => {
  return `yes (10) no (13)`;
};

const roundedAvgAggFunction = (params) => {
  const result = avgAggFunction(params);
  if (result.avg) {
    result.avg = Math.round(result.avg * 100) / 100;
  }
  return result;
};

const avgAggFunction = (params) => {
  let sum = 0;
  let count = 0;
  params.values.forEach((value) => {
    const groupNode =
      value !== null && value !== undefined && typeof value === 'object';
    if (groupNode) {
      sum += value.avg * value.count;
      count += value.count;
    } else {
      if (typeof value === 'number') {
        sum += value;
        count++;
      }
    }
  });

  let avg = null;
  if (count !== 0) {
    avg = sum / count;
  }

  const result = {
    count: count,
    avg: avg,
    toString: function () {
      return `${this.avg}`;
    },
  };
  return result;
};

const DataGrid = ({ rowData, removeData }) => {
  const columnDefs = [
    {
      headerName: 'Age',
      field: 'age',
      sortable: true,
      sort: 'asc',
      aggFunc: roundedAvgAggFunction,
    },
    {
      headerName: 'Experience',
      field: 'experience',
      sortable: true,
      aggFunc: roundedAvgAggFunction,
      valueFormatter: (p) => `${p.value} years`,
    },
    {
      headerName: 'Income',
      field: 'income',
      sortable: true,
      aggFunc: 'avg',
      valueFormatter: formatIncome,
    },
    {
      headerName: 'Nationality',
      field: 'nationality',
      sortable: true,
      cellRenderer: FlagCellRenderer,
      rowGroup: true,
      hide: true,
    },
    {
      headerName: 'Degree',
      field: 'degree',
      sortable: true,
      cellRenderer: degreeCellRenderer,
    },
  ];

  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 270,
    };
  }, []);

  const autoSizeStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 100,
  };

  const defaultColDef = useMemo(() => {
    return { resizable: true, sortable: true, enableRowGroup: true };
  });

  const deleteRow = (rowNode) => {
    const password = prompt('Enter password to delete:');
    const correctPassword = 'balham'; // Replace this with your actual password

    if (password === correctPassword) {
      removeData(rowNode.data.id);
    } else {
      alert('Incorrect password.');
    }
  };

  const getContextMenuItems = (params) => {
    const defaultItems = params.defaultItems;

    const customMenuItem = {
      name: 'Delete',
      action: () => deleteRow(params.node),
    };

    if (!params.node.group) {
      defaultItems.push(customMenuItem);
    }

    return defaultItems;
  };

  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        { statusPanel: 'agTotalRowCountComponent', align: 'left' },
        {
          statusPanel: 'agAggregationComponent',
          statusPanelParams: {
            aggFuncs: ['avg', 'sum'],
          },
        },
      ],
    };
  }, []);

  const rowSelection = useMemo(() => {
    return { mode: 'multiRow' };
  }, []);

  const selectionColumnDef = useMemo(() => {
    return {
      width: 42,
      maxWidth: 42,
      suppressHeaderMenuButton: true,
    };
  }, []);

  const sideBar = useMemo(() => {
    return {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          minWidth: 225,
          maxWidth: 225,
          width: 225,
        },
      ],
      position: 'right',
      defaultToolPanel: 'columns',
    };
  }, []);

  return (
    <div
      className="ag-theme-quartz-dark"
      style={{ height: '100%', width: '100%' }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        autoSizeStrategy={autoSizeStrategy}
        rowGroupPanelShow={'always'}
        defaultColDef={defaultColDef}
        pagination
        enableAdvancedFilter
        statusBar={statusBar}
        rowSelection={rowSelection}
        cellSelection={true}
        selectionColumnDef={selectionColumnDef}
        sideBar={sideBar}
        enableCharts={true}
        suppressAggFuncInHeader={true}
        autoGroupColumnDef={autoGroupColumnDef}
        getContextMenuItems={getContextMenuItems}
        // grandTotalRow={'bottom'}
      />
    </div>
  );
};

export default DataGrid;
