import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { FlagCellRenderer } from './CellRenderers/FlagCellRenderer';
import DataGridStyles from './DataGridStyles.module.scss';
import 'ag-grid-enterprise';

const formatCurrencyGBP = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount.value);

const degreeCellRenderer = (params) => (
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

const DataGrid = ({ rowData }) => {
  const columnDefs = [
    {
      headerName: 'Age',
      field: 'age',
      sortable: true,
      sort: 'asc',
      aggFunc: 'avg',
    },
    {
      headerName: 'Experience',
      field: 'experience',
      sortable: true,
      aggFunc: 'avg',
      valueFormatter: (p) => `${p.value} years`,
    },
    {
      headerName: 'Degree',
      field: 'degree',
      sortable: true,
      cellRenderer: degreeCellRenderer,
    },
    {
      headerName: 'Income',
      field: 'income',
      sortable: true,
      aggFunc: 'avg',
      valueFormatter: formatCurrencyGBP,
    },
    {
      headerName: 'Nationality',
      field: 'nationality',
      sortable: true,
      cellRenderer: FlagCellRenderer,
    },
  ];

  const autoSizeStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 100,
  };

  const defaultColDef = useMemo(() => {
    return { resizable: true, sortable: true, enableRowGroup: true };
  });

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
      style={{ height: 575, width: '100%' }}
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
        // grandTotalRow={'bottom'}
      />
    </div>
  );
};

export default DataGrid;
