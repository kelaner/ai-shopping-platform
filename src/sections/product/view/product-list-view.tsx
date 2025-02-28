'use client';

import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import type {GridColDef, GridColumnVisibilityModel, GridRowSelectionModel, GridSlots,} from '@mui/x-data-grid';
import {
  DataGrid,
  GridActionsCellItem,
  gridClasses,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import {useCallback, useEffect, useState} from 'react';

import {PRODUCT_STOCK_OPTIONS} from 'src/_mock';
import {useGetProducts} from 'src/actions/product';
import {ConfirmDialog} from 'src/components/custom-dialog';
import {EmptyContent} from 'src/components/empty-content';
import {Iconify} from 'src/components/iconify';

import {toast} from 'src/components/snackbar';

import {useBoolean} from 'src/hooks/use-boolean';
import type {UseSetStateReturn} from 'src/hooks/use-set-state';
import {useSetState} from 'src/hooks/use-set-state';
import {DashboardContent} from 'src/layouts/dashboard';
import {useRouter} from 'src/routes/hooks';

import {paths} from 'src/routes/paths';
import type {IProductItem, IProductTableFilters} from 'src/types/product';
import {ProductTableFiltersResult} from '../product-table-filters-result';
import {
  RenderCellCreatedAt,
  RenderCellPrice,
  RenderCellProduct,
  RenderCellPublish,
  RenderCellStock,
} from '../product-table-row';

import {ProductTableToolbar} from '../product-table-toolbar';

// ----------------------------------------------------------------------

const PUBLISH_OPTIONS = [
  {value: 'published', label: '发布'},
  {value: 'draft', label: '草稿'},
];

const HIDE_COLUMNS = {category: false};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export function ProductListView() {
  const confirmRows = useBoolean();

  const router = useRouter();

  const {products, productsLoading} = useGetProducts();

  const filters = useSetState<IProductTableFilters>({publish: [], stock: []});

  const [tableData, setTableData] = useState<IProductItem[]>([]);

  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);

  const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  useEffect(() => {
    if (products.length) {
      setTableData(products);
    }
  }, [products]);

  const canReset = filters.state.publish.length > 0 || filters.state.stock.length > 0;

  const dataFiltered = applyFilter({inputData: tableData, filters: filters.state});

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Delete success!');

      setTableData(deleteRow);
    },
    [tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !selectedRowIds.includes(row.id));

    toast.success('Delete success!');

    setTableData(deleteRows);
  }, [selectedRowIds, tableData]);

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.product.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.product.details(id));
    },
    [router]
  );

  const CustomToolbarCallback = useCallback(
    () => (
      <CustomToolbar
        filters={filters}
        canReset={canReset}
        selectedRowIds={selectedRowIds}
        setFilterButtonEl={setFilterButtonEl}
        filteredResults={dataFiltered.length}
        onOpenConfirmDeleteRows={confirmRows.onTrue}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters.state, selectedRowIds]
  );

  const columns: GridColDef[] = [
    {field: 'category', headerName: '分类', filterable: false},
    {
      field: 'name',
      headerName: '产品名',
      flex: 1,
      minWidth: 360,
      hideable: false,
      renderCell: (params) => (
        <RenderCellProduct params={params} onViewRow={() => handleViewRow(params.row.id)}/>
      ),
    },
    {
      field: 'createdAt',
      headerName: '创建时间',
      width: 160,
      renderCell: (params) => <RenderCellCreatedAt params={params}/>,
    },
    {
      field: 'inventoryType',
      headerName: '库存',
      width: 160,
      type: 'singleSelect',
      valueOptions: PRODUCT_STOCK_OPTIONS,
      renderCell: (params) => <RenderCellStock params={params}/>,
    },
    {
      field: 'price',
      headerName: '价格',
      width: 140,
      editable: true,
      renderCell: (params) => <RenderCellPrice params={params}/>,
    },
    {
      field: 'publish',
      headerName: '发布时间',
      width: 110,
      type: 'singleSelect',
      editable: true,
      valueOptions: PUBLISH_OPTIONS,
      renderCell: (params) => <RenderCellPublish params={params}/>,
    },
    // {
    //   type: 'actions',
    //   field: 'actions',
    //   headerName: ' ',
    //   align: 'right',
    //   headerAlign: 'right',
    //   width: 80,
    //   sortable: false,
    //   filterable: false,
    //   disableColumnMenu: true,
    //   getActions: (params) => [
    //     <GridActionsCellItem
    //       showInMenu
    //       icon={<Iconify icon="solar:eye-bold"/>}
    //       label="View"
    //       onClick={() => handleViewRow(params.row.id)}
    //     />,
    //     <GridActionsCellItem
    //       showInMenu
    //       icon={<Iconify icon="solar:pen-bold"/>}
    //       label="Edit"
    //       onClick={() => handleEditRow(params.row.id)}
    //     />,
    //     <GridActionsCellItem
    //       showInMenu
    //       icon={<Iconify icon="solar:trash-bin-trash-bold"/>}
    //       label="Delete"
    //       onClick={() => {
    //         handleDeleteRow(params.row.id);
    //       }}
    //       sx={{color: 'error.main'}}
    //     />,
    //   ],
    // },
  ];

  const getTogglableColumns = () =>
    columns
    .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
    .map((column) => column.field);


  return (
    <>
      <DashboardContent sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
        {/* <CustomBreadcrumbs */}
        {/*   heading="List" */}
        {/*   links={[ */}
        {/*     { name: 'Dashboard', href: paths.dashboard.root }, */}
        {/*     { name: 'Product', href: paths.dashboard.product.root }, */}
        {/*     { name: 'List' }, */}
        {/*   ]} */}
        {/*   action={ */}
        {/*     <Button */}
        {/*       component={RouterLink} */}
        {/*       href={paths.dashboard.product.new} */}
        {/*       variant="contained" */}
        {/*       startIcon={<Iconify icon="mingcute:add-line" />} */}
        {/*     > */}
        {/*       New product */}
        {/*     </Button> */}
        {/*   } */}
        {/*   sx={{ mb: { xs: 3, md: 5 } }} */}
        {/* /> */}

        <Card
          sx={{
            flexGrow: {md: 1},
            display: {md: 'flex'},
            height: {xs: 800, md: 2},
            flexDirection: {md: 'column'},
          }}
        >
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            loading={productsLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{pagination: {paginationModel: {pageSize: 10}}}}
            onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
              toolbar: CustomToolbarCallback as GridSlots['toolbar'],
              noRowsOverlay: () => <EmptyContent/>,
              noResultsOverlay: () => <EmptyContent title="No results found"/>,
            }}
            slotProps={{
              panel: {anchorEl: filterButtonEl},
              // @ts-ignore
              toolbar: {setFilterButtonEl},
              columnsManagement: {getTogglableColumns},
            }}
            sx={{[`& .${gridClasses.cell}`]: {alignItems: 'center', display: 'inline-flex'}}}
          />
        </Card>
      </DashboardContent>

      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selectedRowIds.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirmRows.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

interface CustomToolbarProps {
  canReset: boolean;
  filteredResults: number;
  selectedRowIds: GridRowSelectionModel;
  onOpenConfirmDeleteRows: () => void;
  filters: UseSetStateReturn<IProductTableFilters>;
  setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

function CustomToolbar({
                         filters,
                         canReset,
                         selectedRowIds,
                         filteredResults,
                         setFilterButtonEl,
                         onOpenConfirmDeleteRows,
                       }: CustomToolbarProps) {
  return (
    <>
      <GridToolbarContainer>
        <ProductTableToolbar
          filters={filters}
          options={{stocks: PRODUCT_STOCK_OPTIONS, publishs: PUBLISH_OPTIONS}}
        />

        <GridToolbarQuickFilter/>

        <Stack
          spacing={1}
          flexGrow={1}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          {!!selectedRowIds.length && (
            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold"/>}
              onClick={onOpenConfirmDeleteRows}
            >
              Delete ({selectedRowIds.length})
            </Button>
          )}

          <GridToolbarColumnsButton/>
          <GridToolbarFilterButton ref={setFilterButtonEl}/>
          <GridToolbarExport/>
        </Stack>
      </GridToolbarContainer>

      {canReset && (
        <ProductTableFiltersResult
          filters={filters}
          totalResults={filteredResults}
          sx={{p: 2.5, pt: 0}}
        />
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: IProductItem[];
  filters: IProductTableFilters;
};

function applyFilter({inputData, filters}: ApplyFilterProps) {
  const {stock, publish} = filters;

  if (stock.length) {
    inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  }

  if (publish.length) {
    inputData = inputData.filter((product) => publish.includes(product.publish));
  }

  return inputData;
}
