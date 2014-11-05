/**
 *
 var tableMedaDef = {
  columns: [
    {
       name: 'theadName', // 表头要显示的名字。@required。table header name property
       field: 'field', // 表头对应的field。field to iterator, generator dependency on rowItemName.
       cssProperty: '', // 对该列的自定义css。css property setting.
                       // @breakall: If the text in field is very long, should add breakall make sure it can break to multi line
                       // @text-right: for operation field we should use right align
       htmlField: false, //如果是html的内容将自动采用html格式文本 if field is html, set the proeprty to true, use bo-html or bind-html.
       filter: '', // angular 过滤器。 formatter function for field.
       truncateText: false, //文字是否要截断。 if field is true, it will auto add the  aliyun-truncate-text directive.
       truncateTextLength: 20, // 如果文字需要截断默认的长度为12。if truncateText is set to true, need this property to specify the max length to show ...
       fieldDirective: '', // 将采用directive来渲染单元格。need special directive for the field. If this property is setting, @filed @htmlField @truncate
                          // will not work. depend on rowItemName
       bindable: false // 如果属性设置为true，则强制使用bindable。
       }
       ],
       useBindOnce: false, // 默认为false，true 将使用bindonce。bindOnce true the bind once will be supported to optiomize the performance and reduce the binding.
       paginationSupport: false, // 默认为false， ture将启用分页组件。if true pagination bar will be added.
       searchSupport: false, // 默认为false，true将启用搜索工具栏。if true the search bar will be added to dom object.
       checkboxSupport: false, // 默认false，true将启用首列为checkbox。if the proeperty is true, the first column will set as checkbox.
       filterItems: [], // 按照column的field来指定表头过滤。支持格式如下{"region":[{"id":"all","text":"全部"},{"id":"Prepaid","text":"包年包月"},{"id":"AfterPay","text":"按量"}],"region2":[{"id":"all","text":"全部"},{"id":"Prepaid","text":"包年包月"},{"id":"AfterPay","text":"按量"}]}
       preSelectionFilter: {}, //支持默认选择过滤条件。 {region: 'Prepaid'}
       searchItems: [],  // 如果搜索启用。指定搜索范围和placeholder。 [{"value":"deviceName","text":"磁盘名称","placeholder":"请输入磁盘名称进行模糊查询"},{"value":"deviceNo","text":"磁盘ID","placeholder":"请输入磁盘ID进行精确查询"}]
       preSelectionSearch: {}, // 如果搜索启用，搜索范围确定，可以采用默认的搜索选择第N项以某搜索条件开始。 {key: 'deviceNo',value: 'testinfo'}
       selectedProperty: 'selected', //属性名以标示当然的row是否被选中。默认为selected。every row selected identifier, default value is 'selected'
       selectedScopeProperty: 'selectedItems', //默认放在scope上的属性，用来标示当前选中的rows, default value is 'selectedItems'
       batchOperationBarDirective: '', // 批量操作控件。例如 <div aliyun-sample-batch-operation selected-items="selectedItems" ></div>
       rowItemName: 'item' //ng-repeat 提供的每行的标示。默认为item。 the iterator name for ng-repeat. which will be helpful while you specify the for iterator
       checkboxDisabledProperty: 'noneSelected' //如果属性为true，将这一行的属性的checkbox为disabled。
    }]}

      sample usage:
      $scope.updateTableData = function(params){
        updateHomeView({
          params: params.params
        }, !params.isInitTableRequest)
      }

     $scope.columns = [
     {name: '实例ID/名称', field: 'vpcInstanceId'},
     {name: '状态', field: 'vpcInstanceStatus', filter: 'vpcInstanceStatusFilter'},
     {name: '已用缓存及配额', field: 'memUsed'},
     {name: '区域', field: 'region', filterOptionKey: 'region'},
     {name: '创建时间', field: 'gmtCreated', filterOptionKey: 'region2'},
     {name: '操作', cssProperty: 'text-right', fieldDirective: '<div vpc-instance-list-actions></div>'}
     ]

    $scope.config = {
      clientSort: false // false. if the property is true, grid can support client sort.
                        // If the column also with filter support, it will not support browser sort anymore.
      useBindOnce: true, // true the bind once will be supported to optiomize the performance and reduce the binding.
      paginationSupport: true, // if true pagination bar will be added.
      searchSupport: false, // if true the search bar will be added to dom object.
      checkboxSupport: false, // if the property is true, the first column will set as checkbox.
      rowItemName: 'vpcItem', // the iterator name for ng-repeat. which will be helpful while you specify the for ng-repeat
      filterItems: {
        region: [
          {id:'all',text:'全部'},
          {id:'Prepaid',text:'包年包月'},
          {id:'AfterPay',text:'按量'}
        ],
        region2: [
          {id:'all',text:'全部'},
          {id:'Prepaid',text:'包年包月'},
          {id:'AfterPay',text:'按量'}
        ]
      },
      preSelectionFilter: {
        region: 'Prepaid'
      },
      searchItems: [
        {value:'deviceName',text:'磁盘名称',placeholder:'请输入磁盘名称进行模糊查询'},
        {value:'deviceNo',text:'磁盘ID',placeholder:'请输入磁盘ID进行精确查询'},
        {value:'instanceId',text:'实例ID',placeholder:'请输入实例ID进行精确查询'},
        {value:'instanceName',text:'实例名称',placeholder:'请输入实例名称进行模糊查询',type:'date'}
      ],
      preSelectionSearch: {
        key: 'deviceNo',
        value: 'testinfo'
      },
      paginationInfo: {
        pageSize: 10,
        page: 1,
        maxSize:5, //最大展示页，默认3
        showPageGoto: false //属性为true将显示前往第几页。
      }
    }
 */
define(['./aliyunCommonDirectives', 'angular', './aliyunConsolePagination', 'bindonce', './loading',
  './searchBar', './tableSearch', './noneDataInfo'],
  function (directiveModule, angular) {

    function buildSearchBar(config, element){
      if(config.searchSupport){
        var preSelectionSearch = '';
        if(config.preSelectionSearch){
          preSelectionSearch = ' pre-selection="{{searchParams}}"';
        }
        var searchHtml = '<div aliyun-console-search-bar search-text="searchParams.value" ' +
          'dimensions="searchItems" search-action="searchAction(data)" search-text="searchParams.searchCondition" ' +
          preSelectionSearch + '></div>';
        element.find('.searchSection').html(searchHtml)
      }
    }

    function buildTable(columns, config){
      var header = buildHeader(columns, config);
      var rowDef = buildRows(columns, config);
      var tfoot = buildTfoot(columns, config);
      return '<table class="table table-hover">' + header + rowDef + tfoot +'</table>'
    }

    function renderSelectedAllCell(isHeader){
      var cellTag = isHeader?'th': 'td';
      return '<' + cellTag + ' width="10"><input type="checkbox" data-ng-model="tableState.selectAll" ng-change="changeSelectionAll()"/></' + cellTag + '>';
    }

    function buildTfoot(columns, config){
      var firstCell = ''
      if(config.checkboxSupport){
        firstCell = renderSelectedAllCell(false);
      }
      var colspan = columns.length;

      var showPageGotoEle = '';
      if(config.paginationInfo){
        var showPageGoto = config.paginationInfo.showPageGoto;
        if(showPageGoto){
          showPageGotoEle = ' show-page-goto="'+ config.paginationInfo.showPageGoto + '" ';
        }
      }

      var pagination = '<div data-ng-if="paginationSupport && showNoneDataInfoTip != true && !loadingState">' +
        '<div class="pull-right" aliyun-console-pagination pagination-info="paginationInfo" ' + showPageGotoEle + ' max-size="maxSize"' +
        ' on-select-page="pageChanged(page)"></div></div>';
      var batchOperationBarDirective = config.batchOperationBarDirective || '';
      var batchBar = '<div class="pull-left">' + batchOperationBarDirective + '</div>';
      var secondCell = '<td colspan=" ' + colspan +'" >' + batchBar + pagination +'</td>'
      if(batchOperationBarDirective != '' || config.paginationSupport){
        return '<tfoot><tr>' + firstCell + secondCell + '</tr></tfoot>'
      }
      return '';
    }

    function buildHeader(columns, config){
      var headerContent = '';
      if(config.checkboxSupport){
        headerContent = renderSelectedAllCell(true);
      }
      angular.forEach(columns, function(col){
        var cssProperty = col.cssProperty ? ' class="' + col.cssProperty + '" ' : "";
        var filterOptionKey = col.filterOptionKey;

        var tableHeaderFilter = '';
        var preSelectedFilter = '';
        var clientSort = '';
        if(config.preSelectionFilter){
          preSelectedFilter = ' pre-selected-id="filterParams.' + filterOptionKey + '"';
        }

        if(filterOptionKey){
          tableHeaderFilter = ' aliyun-console-table-search '+ preSelectedFilter + ' filter-field="' + filterOptionKey + '" items="filterItems.'+ filterOptionKey + '" click-action="changeTheadFilter(data)" '
        }else{
          if(config.clientSort && col.field){
            clientSort = '<span class="icon-updown btn-link" data-ng-click="clientSortHandler(\''+ col.field + '\', sortReverse)"></span>'
          }
        }
        headerContent += '<th' + cssProperty + tableHeaderFilter+ '>' + col.name + clientSort + '</th>'
      })
      return '<thead><tr>' + headerContent + '</tr></thead>'
    }

    function buildRows(columns, config){
      var useBindOnce = config.useBindOnce ? 'bindonce' : '';
      var rowItemName = config.rowItemName ? config.rowItemName : 'item';
      var itemList = config.itemList || 'store';
      var rowItem = '';
      if(config.checkboxSupport){
        config.selectedScopeProperty = config.selectedScopeProperty || 'selectedItems';
        var selectedBindingKey = rowItemName + '.' + config.selectedProperty;
        var checkboxDisabledProperty = config.checkboxDisabledProperty;
        var checkboxDisabledSetting = ''
        if(checkboxDisabledProperty){
          checkboxDisabledSetting = ' data-ng-disabled="' + rowItemName + '.' + checkboxDisabledProperty + '" ';
        }
        rowItem = '<th width="10"><input type="checkbox" ' +  checkboxDisabledSetting + ' data-ng-model="' +
          selectedBindingKey + '" ng-change="changeSelection({data: ' + rowItemName + '})"/></th>';
      }
      angular.forEach(columns, function(col){
        var cellContent = cellRender(col, rowItemName, useBindOnce);
        var cssProperty = col.cssProperty ? ' class="' + col.cssProperty + '" ' : "";
        rowItem += '<td' + cssProperty + '>' + cellContent + '</td>'
      })
      return '<tbody><tr text-editor-trigger-target data-ng-if="!loadingState" ' + useBindOnce + ' data-ng-repeat="' + rowItemName + ' in ' + itemList + '">' + rowItem + '</tr></tbody>'
    }

    function cellRender(colDef, rowItemName, useBindOnce){
      var cellContent = '';
      var cellFilter = colDef.filter;
      var colField = colDef.field;
      var itemString = rowItemName + '.' + colField;
      var fieldDirective = colDef.filedDirective || colDef.fieldDirective;
      if(fieldDirective){
        return fieldDirective;
      }
      if(colField){
        if(cellFilter){
          itemString +=  '|' + cellFilter;
        }
        if(colDef.truncateText){
          var textLength = colDef.truncateTextLegnth || colDef.truncateTextLength; // fix typo issue
          var textLengthText = textLength ? ' text-length=' + textLength : '';
          cellContent = '<span aliyun-truncate-text source-text="{{'+ itemString + '}}" ' + textLengthText + '></span>';
        }else{
          if(colDef.bindable == true || useBindOnce == false){
            if(colDef.htmlField){
              cellContent = '<span ng-bind-html=' + itemString +' ></span>'
            }else{
              cellContent = '{{' + itemString +'}}'
            }
          }else{
            var bindTag = colDef.htmlField ? 'bo-html': 'bo-text';
            cellContent = '<span ' + bindTag + '="' + itemString + '"></span>'
          }
        }
      }
      return cellContent;
    }

    /**
     * 将查询参数转换为请求的参数params.
     * @param data
     * @returns {{}}
     */
    function convertSearchParamsToOption(data){
      var params = {};
      angular.extend(params, data.pageInfo);
      angular.extend(params, data.filterParams);
      var searchParams = data.searchParams;
      if(searchParams){
        var newObj = {};
        if(searchParams.key && searchParams.value){
          newObj[searchParams.key] = searchParams['value'];
        }
        angular.extend(params, newObj);
      }
      return params;
    }

    directiveModule.directive('aliyunSimpleGrid', ['$compile', '$filter', function($compile, $filter) {
      return{
        restrict: 'A',
        scope: {
          columns: '=',
          store: '=',
          config: '=',
          paginationInfo: '=',
          loadingState: '=',
          renderTable: '&',
          searchPreHandler: '&',
          selectionChange: '&'
        },
        templateUrl: 'scripts/template/simpleGrid.html',
        controller: ['$scope', function($scope){
          $scope.initTableRequestSend = false;
          $scope._searchPreHandler = function(data, isFilter){
            if(angular.isFunction($scope.searchPreHandler)){
              $scope.searchPreHandler({
                data: {
                  data: data,
                  scope: $scope,
                  isTableFilter: isFilter
                }
              })
            }
          }

          /**
           * 改变选择全部。
           */
          $scope.changeSelectionAll = function(){
            var config = $scope.config;
            var itemName = config.selectedProperty;
            var checkboxDisabledProperty = config.checkboxDisabledProperty;
            var selectState = $scope.tableState.selectAll;
            var selectedItems = [];
            angular.forEach($scope.store, function(item, index){
              if(checkboxDisabledProperty && item[checkboxDisabledProperty]){
                //do nothing.
              }else{
                item[itemName] = selectState;
                if(selectState){
                  selectedItems.push(item)
                }
              }
            })
            $scope.selectionChangeHandler(selectedItems);
          }

          $scope.clientSortHandler = function(field){
            $scope.reserves = !$scope.reserves
            var orderBy = $filter('orderBy');
            $scope.store = orderBy($scope.store,field, $scope.reserves)
          }

          /**
           * 改变一行的选择
           * @param item
           */
          $scope.changeSelection = function(item){
            var itemName = $scope.config.selectedProperty;
            item[itemName] = !item[itemName];
            var firstRowState;
            var unique = true;
            var itemSelected = [];
            angular.forEach($scope.store, function(item, index){
              var rowState = item[itemName];
              if(index == 0){
                firstRowState = rowState;
              }
              if(firstRowState != rowState){
                unique = false;
              }
              if(rowState){
                itemSelected.push(item);
              }
            })
            if(unique == true){
              $scope.tableState.selectAll = firstRowState;
            }else{
              $scope.tableState.selectAll = false;
            }
            $scope.selectionChangeHandler(itemSelected);
          }


          $scope.selectionChangeHandler = function(selectedItems){
            var configProp = $scope.config.selectedScopeProperty;
            $scope[configProp] = selectedItems;
            $scope.selectionChange({
              data: selectedItems
            })
          }

          /**
           * 刷新按钮的调用方法。
           * 清除所有的过滤和查询条件。
           */
          $scope.refreshCurrentView = function(){
            $scope.filterParams = {};
            $scope.searchParams = {};
            $scope.updateList();
          }

        }],
        link: function (scope, element, attrs) {
          scope.tableState = {
            selectAll: false
          }
          scope.filterParams = {};
          scope.searchParams = {};

          /**
           * 当表头发生变化和过滤后的事件。
           * @param data
           */
          scope.changeTheadFilter = function(data){
            scope._searchPreHandler(data, true);
            var filterField = data.filterField;
            var filterItem = data.item;
            var dest = scope.filterParams || {};
            if(filterField){
              if(filterItem.id == 'all'){
                delete dest[filterField];
              }else{
                dest[filterField] = filterItem.id;
              }
            };
            scope.filterParams = dest;
            scope.paginationInfo.page = 1;
            scope.searchParams = {};
            scope.updateList();
          }

          scope.pageChanged = function(page){
            scope.paginationInfo.page = page;
            scope.updateList();
          }

          /**
           * 当用户点击搜索的时候取消所有的过滤条件。
           * @param data
           */
          scope.searchAction = function(data){
            scope._searchPreHandler(data, false);
            if(scope.config.paginationSupport){
               scope.paginationInfo && (scope.paginationInfo.page = 1);
            }
            scope.filterParams = {};
            scope.searchParams = data;
            scope.updateList();
          }

          scope.updateList = function(isInitTableRequest){
            if(isInitTableRequest){
              scope.initTableRequestSend = true;
            }
            var config = scope.config;
            var paginationInfo = scope.paginationInfo;
            var params = {};
            if(config.paginationSupport){
              if(paginationInfo == undefined){
                paginationInfo = config.paginationInfo;
                scope.maxSize = config.paginationInfo.maxSize || 3;
              }
              params.pageInfo = {
                pageSize: paginationInfo.pageSize,
                currentPage: paginationInfo.page
              }
            }
            if(config.filterItems){
              params.filterParams = scope.filterParams;
            }
            if(config.searchItems){
              params.searchParams = scope.searchParams;
            }
            scope.renderTable({
              data: {
                params: convertSearchParamsToOption(params),
                isInitTableRequest: isInitTableRequest
              }
            })
          }

          scope.$watchCollection('[config, columns]', function(gridDef){
            if(gridDef){
              var config = gridDef[0];
              if(config.filterItems){
                scope.filterItems = config.filterItems;
              }
              if(config.searchItems){
                scope.searchItems = config.searchItems;
              }
              if(config.preSelectionFilter){
                scope.filterParams = config.preSelectionFilter;
              }
              if(config.preSelectionSearch){
                scope.searchParams = config.preSelectionSearch;
              }
              if(config.checkboxSupport){
                if(config.selectedProperty == undefined){
                  config.selectedProperty = 'selected'
                }
              }
              config.refreshCurrentView = scope.refreshCurrentView;
              var columnsDef = gridDef[1];
              scope.noneDataInfoMessage = '没有查询到符合条件的记录';
              scope.paginationSupport = config.paginationSupport;
              var searchBar = buildSearchBar(config, element);
              var tableContent = buildTable(columnsDef, config);
              // angular.element('.gridSection').html(tableContent);
              element.find(".gridSection").html(tableContent);
              $compile(element.contents())(scope);
              if(scope.initTableRequestSend == false){
                scope.updateList(true);
              }
            }
          })

          scope.$watchCollection('[store, paginationInfo]', function(gridDef){
            if(gridDef){
              var store = gridDef[0] || [];
              scope.showNoneDataInfoTip = store.length == 0 ? true:false;
              var pageInfo = gridDef[1];
              /*
                如果数据集合是空的，但是分页信息显示当前并不在第一页，那么说明需要往前跳一页来加载上一页的数据；
                如果已经是第一页了，则不继续往前跳，直接显示数据为空
               */
              if(store.length == 0 && pageInfo &&  pageInfo.page>1){
                scope.paginationInfo.page -= 1;
                scope.updateList();
              }
            }
          })
        }
      }
    }])
  })
