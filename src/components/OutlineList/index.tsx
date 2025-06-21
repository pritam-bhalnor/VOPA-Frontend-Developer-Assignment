import { AllCommunityModule, ClientSideRowModelApiModule, ClientSideRowModelModule, CsvExportModule, ModuleRegistry, NumberFilterModule, PaginationModule, provideGlobalGridOptions, TextFilterModule, ValidationModule } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AllEnterpriseModule, ColumnsToolPanelModule, ContextMenuModule, ExcelExportModule, MasterDetailModule, RowGroupingModule, ServerSideRowModelModule, SideBarModule } from 'ag-grid-enterprise';
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { forwardRef } from "react";

const OutlineList = forwardRef<AgGridReact, AgGridReactProps>(({
  rowData,
  columnDefs,
  pagination = true,
  paginationPageSize = 8,
  ...rest
}, ref) => {
    ModuleRegistry.registerModules([
        AllCommunityModule,
        SideBarModule,
        ColumnsToolPanelModule,
        ServerSideRowModelModule,
        ValidationModule,
        AllEnterpriseModule,
        CsvExportModule,
        ExcelExportModule,
        MasterDetailModule,
        RowGroupingModule,
        TextFilterModule,
        NumberFilterModule,
        ClientSideRowModelModule,
        ClientSideRowModelApiModule,
        PaginationModule,
        ContextMenuModule,
    ]);
    provideGlobalGridOptions({ theme: 'legacy' });
    return (
        <AgGridReact
            ref={ref}
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows={true}
            columnMenu='legacy'
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={false}
            enableBrowserTooltips={true}
            className="ag-theme-alpine"
            {...rest}
        />
    )
})

export default OutlineList