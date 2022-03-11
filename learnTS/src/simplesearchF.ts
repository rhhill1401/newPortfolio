import * as $ from 'jquery';
import * as _ from 'lodash';

//import alert from "../Alert/alert";

let w = window as any;
let $document = $(document);

class SimpleSearch {
  constructor() {
    console.log('test1');
    $document.on('siftRefresh', '.multiSelectForm form', function (e) {
      var form = e.currentTarget;
      var $form = $(form);
      var $multiSelectForm = $form.closest('.multiSelectForm'); // need find the multiform
      var $selectedItems = $multiSelectForm.find('.targetListItem'); // need find all selected items
      var $searchedItems = $form.find('.selectItem'); // need find matching search result items

      var matchedItems = [];

      $searchedItems.each(function (index, searchedItem) {
        var $searchedItem = $(searchedItem);
        var searchedItemData = $searchedItem.data();

        $selectedItems.each(function (index, selectedItem) {
          var $selectedItem = $(selectedItem);
          var selectedItemData = $selectedItem.data();

          if (selectedItemData.id === searchedItemData.id) {
            matchedItems.push(searchedItem);
          }
        });
      });

      if (matchedItems.length > 0) {
        console.log('test2');
        console.log(matchedItems);
        var $matchedItems = $(matchedItems);
        $matchedItems.each(function (index, matchedItem) {
          var $matchedItem = $(matchedItem);
          var $selectItemCheckbox = $matchedItem.find('.selectionCheckbox');
          if ($selectItemCheckbox.length > 0) {
            $selectItemCheckbox.prop(
              'checked',
              !$selectItemCheckbox.prop('checked')
            );
          }
        });
      }
    });

    $(document).on('click', '.clearFilter', function (e) {
      e.preventDefault();

      var $filterWrapper = $(this).parents('.filterWrapper');

      $filterWrapper.find('.filterInput').val('');

      $filterWrapper
        .find('.filterDropdown')
        .find('option:first')
        .prop('selected', true);

      var $filterItems = $filterWrapper.find('.filterItem');

      $filterWrapper.find('.filterParam').each(function () {
        $filterItems = $filterItems.filterProperty(
          $(this).data('key'),
          $(this).val()
        );
      });

      $filterItems.show();
    });
    $(document).on('keyup', '.filterInput', function (e) {
      e.preventDefault();
      console.log('test3');
      var $filterControl = $(this);
      var $filterWrapper = $filterControl.parents('.filterWrapper');
      var time = $(this).data('delay');
      if (time == undefined) {
        time = 0;
      }
      w.typewatch(() => {
        var $filterItems = $filterWrapper.find('.filterItem').hide();

        $filterWrapper.find('.filterParam').each(function () {
          $filterItems = $filterItems.filterProperty(
            $(this).data('key'),
            $(this).val()
          );
        });

        $filterItems.show();
      }, time);
    });
    $(document).on(
      'click',
      '.multiSelectForm .selectionCheckbox',
      function (e) {
        e.stopImmediatePropagation();
        var $selectItem = $(this).parents('.selectItem').addClass('selected');
        $selectItem.siblings('.selected').removeClass('selected');
        var $multiSelectForm = $selectItem.parents('.multiSelectForm');
        selectItem($selectItem, $multiSelectForm);
      }
    );
    $(document).on('click', '.multiSelectForm [select-all]', function (e) {
      e.stopPropagation();
      var $this = $(this);
      var $table = $this.parents('.ls.table');
      var $selectItems = $table.find('.selectItem').removeClass('selected');
      var $multiSelectForm = $table.parents('.multiSelectForm');
      var $selectedItems = $multiSelectForm.find('.targetListItem');

      if ($this.is(':checked')) {
        $table.find('.selectionCheckbox').prop('checked', true);
        $selectItems = $selectItems.filter(function (index, item) {
          return (
            $selectedItems.filterData('id', $(item).data('id')).length == 0
          );
        });
      } else {
        $table.find('.selectionCheckbox').prop('checked', false);
      }

      $selectItems.each(function (index, item) {
        selectItem($(item), $multiSelectForm);
      });
    });
    $(document).on('click', '.selectItem', function (e) {
      e.preventDefault();

      var $target = $(e.target);

      //in the case >>> was clicked
      if ($target.hasClass('filterChildren')) {
        return;
      }

      var $selectItem = $(this);
      var $selectItemCheckbox = $(this).find('.selectionCheckbox');
      if ($selectItemCheckbox.length > 0) {
        $selectItemCheckbox.prop(
          'checked',
          !$selectItemCheckbox.prop('checked')
        );
      }
      var $multiSelectForm = $selectItem.parents('.multiSelectForm');
      if ($multiSelectForm.length > 0) {
        selectItem($selectItem, $multiSelectForm);
      }
    });
    $(document).on('click', '.removeTarget', function (e) {
      e.preventDefault();

      var $selectedItem = $(this).parents('.targetListItem');

      var $multiSelectForm = $selectedItem.parents('.multiSelectForm');

      var $searchedItem = $multiSelectForm
        .find('.selectItem')
        .filterData('id', $selectedItem.data('id'));

      if ($searchedItem.length > 0) {
        $searchedItem.removeClass('selected');
        $searchedItem.find('.selectionCheckbox').prop('checked', false);
        if ($multiSelectForm.find('.selectionCheckbox:checked').length == 0) {
          $multiSelectForm.find('[select-all]').prop('checked', false);
        }
      }

      $selectedItem.remove();
    });

    function selectItem($selectItem, $multiSelectForm) {
      var $checkbox = $selectItem.find('.selectionCheckbox');
      var $selectedList = $multiSelectForm.find('.selectedList');
      var formData = $multiSelectForm.data();
      var $selectedItems;

      var isSelected = false;
      switch (formData.toggle) {
        case 'checkbox':
          if ($checkbox.is(':checked')) {
            isSelected = true;
          } else {
            if (
              $multiSelectForm.find('.selectionCheckbox:checked').length == 0
            ) {
              $multiSelectForm.find('[select-all]').prop('checked', false);
            }
          }
          break;
        case 'item':
          $selectItem.toggleClass('selected');
          if ($selectItem.hasClass('selected')) {
            isSelected = true;
          }
          break;
      }

      var $selectListItem = undefined;

      if (formData.copy) {
        $selectedItems = $selectedList.find('.targetListItem');
        console.log('test4');
        if (isSelected) {
          console.log('test5');
          var copyTemplate = $multiSelectForm.find('.selectedTemplate').html();
          var itemData = $selectItem.data();
          var itemNameKey = formData.nameKey || 'name';
          itemData.name = itemData[itemNameKey];
          itemData.seoName = itemData.seoName;
          itemData.image = itemData.image;
          itemData.legacyId = itemData.legacyId;
          itemData.hasLargeImage = itemData.hasLargeImage;
          itemData.largeImage = itemData.largeImage;
          itemData.hasImage = formData.hasImage;
          $selectListItem = $(_.template(copyTemplate)(itemData));

          if ($selectedItems.length > 0 && formData.sortBy != undefined) {
            $selectedItems.insertElement(formData.sortBy, $selectListItem);
          } else {
            $selectedList.append($selectListItem);
          }
        } else {
          $selectedItems.filterData('id', $selectItem.data('id')).remove();
        }
      }

      var $searchedItems = $multiSelectForm.find('.selectItem.selected');

      if (formData.activeLimit === 1 && $selectListItem) {
        _.forEach($selectListItem.siblings(), function (listItem) {
          var $listItem = $(listItem);
          $searchedItems
            .filterData('id', $listItem.data('id'))
            .toggleClass('selected');
          $listItem.remove();
        });
      }

      $selectItem.trigger('multiselect.select', [isSelected]);
    }

    let SearchPartialUpdated = function () {
      $(document).trigger('UpdateSearchPartial');
    };

    // sets multi select form, removes a tags events and sets up UpdateSearchPartial listener
    let AddMultiSelectAction = function ($form) {
      var data = $form.data();

      if (data.activeLimit === 0 || data.activeLimit > 1) {
      }

      if (data.tableHeight) {
        $form.find('.searchTableWrapper').css({
          'max-height': data.tableHeight + 'px',
          'overflow-y': 'auto',
        });
      }

      if (data.sortable) {
        $form.addClass('sort-manual');

        $form.find('.selectedList').sortable({
          placeholder: data.placeholder || 'target-place-holder-lg',
        });
      }

      $(document).on('UpdateSearchPartial', function () {
        var $multiSelectForm;

        if ($form instanceof jQuery) {
          $multiSelectForm = $form;
        } else {
          $multiSelectForm = $('.multiSelectForm:visible');
        }

        if ($multiSelectForm.length > 0) {
          var $searchedItems = $multiSelectForm.find(
            '.selectItem:not(.selected)'
          );

          var $selectedItems = $multiSelectForm.find('.targetListItem');

          var remove = false;

          if ($selectedItems.length == 0) {
            $selectedItems = $multiSelectForm.find('.selectItem.selected');
            remove = true;
          }

          $selectedItems.each(function () {
            var $searchedItem = $searchedItems.filterData(
              'id',
              $(this).data('id')
            );

            if ($searchedItem.length > 0) {
              if (remove) {
                $searchedItem.remove();
              } else {
                switch (data.toggle) {
                  case 'item':
                    $searchedItem.addClass('selected');
                    break;
                  default:
                    $searchedItem
                      .find('.selectionCheckbox')
                      .prop('checked', true);
                    break;
                }
              }
            }
          });
        }
      });

      $form.find('.ls.table').find('a:not(.filter):not(.sortSelection)').css({
        'pointer-events': 'none',
      });

      w.SearchPartialUpdated();
    };

    // function to search - used in old gift and sample search, delete when those pages are removed

    let Search = function (url, target, data, callback) {
      let item = {
        url: url,
        data: data,
        datatype: 'json',
      };
      let request = $.ajax(item);

      request.done(function (result) {
        var status = result.status;

        if (status == 'Success') {
          target.html(result.partial);
        } else {
          alert(status);
        }

        if (callback != undefined && typeof callback == 'function') {
          callback();
        }
      });

      request.fail(function (res, code) {});
    };

    //--------------------------------------------
    //  Jquery Extended Search Function
    //--------------------------------------------

    var searchSettings;

    var $targetElement = this;
    var targetId = null;
    var settings;

    var self = this;
    $.fn['Search'] = function (options) {
      $targetElement = this;
      targetId = $targetElement['attr']('id');

      if (searchSettings != undefined) {
        settings = searchSettings[targetId];
      }

      if (settings == undefined) {
        settings = { DropdownIds: [] };
      }

      if (options == undefined) {
        search(); // if options is undefined perform search with
      } else {
        settings.Url = options.url;
        settings.Presearch = options.presearch;
        settings.Callback = options.callback;
        settings.PageSize = options.pageSize;
        settings.SearchClass = '.searchControls';

        // if search now is true perform initial search
        if (settings.Presearch) {
          search(settings);
        } else {
          setControls();
        }
      }

      ///----------------------------------------------
      ///                 Event Handlers
      ///----------------------------------------------

      ///----------------------------------------------
      ///                Functions
      ///----------------------------------------------
    };

    // revert to default values then perform search
    function clearSearch(e) {
      e.preventDefault();
      $targetElement['find'](settings.FilterId).val('').data('filter', '');
      _.forEach(settings.DropdownIds, function (id) {
        $targetElement['find'](id)
          .find('option')
          .first()
          .prop('selected', true);
      });
      this.search(settings, setFocus);
    }

    // perform search if enter key is pressed while search box has focus
    function keypress(e) {
      var $searchBox = $(settings.FilterId);
      var isFocus = $searchBox.is(':focus');

      if (isFocus && e.keyCode == 13) {
        $searchBox.data('filter', $searchBox.val());
        e.preventDefault();
        this.search(settings);
      }
    }

    // set search box on focus in
    function focusinSearchBox() {
      $(this).val($(this).data('filter'));
    }

    // set search box on focus out
    function focusoutSearchBox() {
      $(this).data('filter', $(this).val());
    }

    // perform search
    function searchItems(e) {
      e.preventDefault();

      this.search(settings);
    }

    // set search controls
    function setControls() {
      var $controls = $targetElement['find'](settings.SearchClass);
      var controlId;
      var $control;
      var searchFn;

      $controls.each(function (index, item) {
        $control = $(item);
        searchFn = $control.data('search');
        controlId = '#' + $control.attr('id');

        switch (searchFn) {
          case 'button':
            settings.SearchId = controlId;
            $(document).on('click', controlId, searchItems);
            break;
          case 'filter':
            settings.FilterId = controlId;
            $(document).on('focusin', controlId, focusinSearchBox);
            $(document).on('focusout', controlId, focusoutSearchBox);
            $(document).on('keypress', keypress);
            break;
          case 'clear':
            settings.ClearId = controlId;
            $(document).on('click', controlId, clearSearch);
            break;
          case 'dropdown':
            settings.DropdownIds.push(controlId);
            $(document).on('change', controlId, searchItems);
            break;
        }
      });

      if (searchSettings == undefined) {
        searchSettings = [];
      }

      searchSettings[targetId] = settings;

      this.setFocus(settings.FilterId);
    }

    // sets focus to search box
    function setFocus() {
      var $filter = $(settings.FilterId);

      $filter.trigger('focus');
    }

    // function to search
    function getSearchData() {
      var data = {};

      $targetElement['find'](settings.SearchClass).each(function (index, item) {
        var $item = $(item);

        var key = $item.attr('name');
        var method = $item.data('search');

        if (method == 'filter') {
          data['Filter'] = $item.data('filter');
        } else if (method == 'dropdown' || method == 'hidden') {
          data[key] = $item.val();
        }
      });

      if (settings.PageSize != undefined) {
        data['PageSize'] = settings.PageSize;
      }

      return data;
    }

    // function to search

    function search(searchSetting?: any, cb?: () => {}) {
      if (searchSetting != undefined) {
        $.ajax({
          url: searchSetting.Url,
          data: getSearchData(),
          success: function (result) {
            var status = result.status;

            if (status == undefined) {
              $targetElement['html'](result);
            } else {
              if (status == 'Success') {
                if (result.partial != undefined) {
                  $targetElement['html'](result.partial);
                } else if (result.Url != undefined) {
                  window.location.href = result.Url;
                }
              } else {
                alert(status);
              }

              if (
                searchSetting.Callback != undefined &&
                typeof searchSetting.Callback == 'function'
              ) {
                if (
                  searchSetting.Presearch != undefined &&
                  searchSetting.Presearch
                ) {
                  setControls();
                }
                searchSetting.Callback();
                searchSetting.Callback = undefined;
              }

              if (cb != undefined && typeof cb == 'function') {
                cb();
              }
            }
          },
        });
      }
    }

    // filters jQuery objects by data key and value
    // if value is string will edit element holding value with class of
    // key with RegExp function
    $.fn.filterProperty = function (key, value) {
      return this.filter(function () {
        var $item = $(this);
        var match = false;

        if (typeof value === 'object') {
          var keys = Object.keys(value);

          _.forEach(keys, function (valueKey) {
            if (!match) {
              var selected = $item.filterProperty(valueKey, value[valueKey]);
              if (selected.length > 0) {
                match = true;
              }
            }
          });
        } else {
          var $element = $item.find('.' + key);
          if (value === undefined) {
            match = true;
            if ($element.length > 0) {
              var originalValue = $item.data(key);

              var limit = $element.data('limit');

              if (limit !== undefined) {
                originalValue = originalValue.substring(0, limit) + '...';
              }

              $element.html(originalValue);
            }
          } else {
            var numberValue = parseFloat(value);
            var numberItem = parseFloat($item.data(key));

            if (!isNaN(numberValue) && !isNaN(numberItem)) {
              match = numberValue === numberItem;
            } else if (typeof value === 'boolean') {
              match = value === $item.data(key);
            } else if (typeof value === 'string') {
              var name = $item.data(key).toString();
              // check if this category matches the search term, using a global, case insensitive regex
              match = name.search(new RegExp(value, 'gi')) >= 0;

              if ($element.length > 0) {
                var formattedName;

                if ($element.data('limit') !== undefined) {
                  formattedName = $element.text();
                } else {
                  formattedName = name;
                }

                formattedName = match
                  ? formattedName.replace(
                      new RegExp('(' + value + ')', 'gi'),
                      '<span style="font-weight: bolder">$1</span>'
                    )
                  : formattedName;

                $element.html(formattedName);
              }
            }
          }
        }

        return match;
      });
    };

    // filter jQuery objects by any data attribute
    $.fn.filterData = function (key, value) {
      return this.filter(function () {
        return $(this).data(key) === value;
      });
    };

    // insets a jquery object in a list of jquery objects based on the key and whether key values are descending or ascending
    $.fn['insertElement'] = function (key, $item, descendingOrder) {
      var value = $item.data(key);

      var inserted = false;

      let callback: any = function () {
        var $listItem = $(this);
        var thisValue = $listItem.data(key);

        if ((descendingOrder && thisValue < value) || thisValue > value) {
          $listItem.before($item);
          inserted = true;
          return false;
        }

        return true;
      };

      $(this).each(callback);

      if (!inserted) {
        $(this).last().after($item);
      }
    };

    $.fn['lsCategoryFilter'] = function (params) {
      var $this = $(this);
      var $valueElement = $(params.valueSelector);
      var $searchSelector = $(params.searchSelector);
      var $clearSelector = $(params.clearSelector);
      var $linkSelector = $(params.linkSelector);
      var $baseLink = $linkSelector.first();
      var $filterSelector = $(params.filterSelector);
      var $buttonSelector = $(params.buttonSelector);
      var $linkContainerSelector = $(params.linkContainerSelector);

      $searchSelector.focusTextToEnd();

      $clearSelector.on('click', function () {
        $valueElement.prop('disabled', true);
      });

      $searchSelector.keyup(function () {
        w.typewatch(function () {
          $this.submit();
        }, 500);
      });

      $searchSelector.keypress(function (e) {
        if (e.keyCode == 13) {
          e.preventDefault();
          e.stopPropagation();
        }
      });

      $buttonSelector.on('click', function () {
        var $button = $(this);
        var data = $button.data();

        if (!data.inactiveText) {
          data.inactiveText = $button.text();
          $button.data(data);
        }

        var linkData = $baseLink.data();
        if (!linkData.inactiveText) {
          linkData.inactiveText = $baseLink.text();
          $baseLink.data(linkData);
        }

        if ($button.hasClass('active')) {
          $button.find('span').text(data.inactiveText);
          $baseLink.text(linkData.inactiveText);
        } else {
          $button.find('span').text(data.activeText);
          $baseLink.text(linkData.activeText);
        }

        $baseLink.nextAll().remove();

        $valueElement.prop('disabled', true);
      });

      $linkSelector.on('click', function (e) {
        e.preventDefault();

        var $link = $(this);
        var data = $link.data();

        data.id = data.id == 0 ? undefined : data.id;

        $valueElement.val(data.id);
        $valueElement.prop('disabled', false);

        $this.submit();

        $link.nextAll().remove();
      });

      $filterSelector.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        var $category = $(this).parents(params.categorySelector);

        var data = $category.data();

        $valueElement.val($category.data('id'));
        $valueElement.prop('disabled', false);

        var $link = _.template($(params.linkTemplate).html())({
          id: data.id,
          name: data.name,
        });

        $linkContainerSelector.append($link);

        $this.submit();
      });
    };
  }
}
export default SimpleSearch;
