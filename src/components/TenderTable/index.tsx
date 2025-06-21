import { FC, useEffect, useMemo, useRef, useState } from "react";
import { getContent } from "../../helper/axiosInstance";
import { Tender } from "./type";
import OutlineList from "../OutlineList";
import { ColDef, ValueFormatterParams } from "ag-grid-community";
import { FaChartBar, FaEye } from "react-icons/fa";
import TenderDetailModal from "./TenderDetailModal";
import { AgGridReact } from "ag-grid-react";

const defaultTextFilterOptions = {
    floatingFilter: true,
    filterParams: {
        debounceMs: 1000,
        trimInput: true,
        buttons: ['reset'],
        maxNumConditions: 1,
    },
    filter: 'agTextColumnFilter',
    suppressHeaderFilterButton: true,
};

const TenderTable = () => {
    const [rowData, setRowData] = useState<Tender[]>([]);
    const [selectedTenderId, setSelectedTenderId] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const gridRef = useRef<AgGridReact>(null);
    const [isFetching, setIsFetching] = useState(true);
    const [gridReady, setGridReady] = useState(false);
    const handleViewTender = (id: string) => {
        setSelectedTenderId(id);
        setIsModalOpen(true);
    };

    const columnDefs = useMemo((): ColDef[] => [
        {
            headerName: "Title",
            field: "title",
            flex: 2,
            tooltipField: "title",
            ...defaultTextFilterOptions,
        },
        {
            headerName: "Category",
            field: "category",
            flex: 1,
            ...defaultTextFilterOptions,
        },
        {
            headerName: "Supplier",
            valueGetter: (params) =>
                params.data.awarded?.[0]?.suppliers?.[0]?.name ?? "N/A",
            flex: 2,
            tooltipValueGetter: (params) =>
                params.data.awarded?.[0]?.suppliers?.[0]?.name ?? "N/A",
            ...defaultTextFilterOptions
        },
        {
            headerName: "Deadline",
            field: "deadline_date",
            flex: 1,
            ...defaultTextFilterOptions
        },
        {
            headerName: "Country",
            valueGetter: () => "Spain",
            flex: 1,
        },
        {
            headerName: 'Actions',
            flex: 1,
            cellRenderer: renderViewButton(handleViewTender)
        }
    ], []);

    useEffect(() => {
        const fetchTenders = async () => {
            try{
                setIsFetching(true);
                const data = await getContent<Tender[]>('tenders');
                setRowData(data ?? []);
                setIsFetching(false);
            } catch (error) {
                console.error('Error fetching tenders:', error);
                setRowData([]);
                setIsFetching(false);
            }
        };
        fetchTenders();
    }, []);

    useEffect(() => {
        const api = gridRef?.current?.api;
        if (!gridReady || !api) return;
        api.setGridOption('loading', isFetching);
    }, [isFetching, gridReady, rowData]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-6">
            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-3">
                    <FaChartBar className="text-blue-600" size={32} />
                    Tender Dashboard
                </h2>

                <div className="rounded-xl overflow-hidden shadow border border-gray-300">
                    <div className="ag-theme-alpine w-full" style={{ height: 500 }}>
                        <OutlineList
                            ref={gridRef}
                            rowData={rowData}
                            columnDefs={columnDefs}
                            loadingOverlayComponent={LoadingOverlay}
                            onGridReady={() => setGridReady(true)}
                        />
                    </div>
                </div>

                <TenderDetailModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    id={selectedTenderId}
                />
            </div>
        </div>
    );
};

const renderViewButton = (onView: (id: string) => void) => {
    return (params: ValueFormatterParams) => (
        <ViewButton params={params} onView={onView} />
    );
};

const LoadingOverlay = () => (
    <div className="flex justify-center items-center h-full">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
);

type ViewButtonProps = {
    params: ValueFormatterParams;
    onView: (id: string) => void;
};

const ViewButton: FC<ViewButtonProps> = ({ params, onView }) => {
    const tenderId = params?.data?.id;

    return (
        <button
            type="button"
            title="View Tender Details"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium rounded-full shadow-md hover:from-indigo-600 hover:to-blue-700 hover:shadow-lg active:scale-95 focus:outline-none transition-all duration-200"
            onClick={() => {
                if (!tenderId) return;
                onView(tenderId);
            }}
        >
            <FaEye className="text-white" />
        </button>
    );
};

export default TenderTable;
