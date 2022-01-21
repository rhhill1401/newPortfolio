// import * as $ from 'jquery';
// import * as _ from 'lodash';
// import notification from '../Notification/notification';
// import alert from '../Alert/alert';
// import * as Modal from '../Modal/modal';

// var w = window as any;
// var $document = $(document);

// export class ManagePages {
//   constructor() {
//     var modals = [];

//     // add / edit banner photo modal
//     var addEditBannerPhotoModalOptions = new Modal.LsModalOptions();
//     addEditBannerPhotoModalOptions.id = 'addEditBannerModal';
//     addEditBannerPhotoModalOptions.width = '900px';
//     addEditBannerPhotoModalOptions.contentId = 'editBannerContainer';
//     var addEditBannerPhotoModal = new Modal.LsModal(
//       addEditBannerPhotoModalOptions
//     );

//     //  edit banner collection modal
//     var editBannerCollectionModalOptions = new Modal.LsModalOptions();
//     editBannerCollectionModalOptions.id = 'editBannerCollectionModal';
//     editBannerCollectionModalOptions.bodyId = 'editBannerCollectionModalBody';
//     editBannerCollectionModalOptions.width = '75%';
//     editBannerCollectionModalOptions.title = 'Select Banners';
//     editBannerCollectionModalOptions.saveButtonId = 'saveBannerCollection';
//     var editBannerCollectionModal = new Modal.LsModal(
//       editBannerCollectionModalOptions
//     );

//     // add layout modal
//     var addLayoutModalOptions = new Modal.LsModalOptions();
//     addLayoutModalOptions.id = 'createLayoutModal';
//     addLayoutModalOptions.width = '500px';
//     addLayoutModalOptions.contentId = 'createLayoutContent';
//     var addLayoutModal = new Modal.LsModal(addLayoutModalOptions);

//     // opens edit banner collection modal
//     $document.on('click', '.editBannerCollection', e => {
//       e.preventDefault();

//       var $this = $(e.currentTarget);
//       editBannerCollections($this);
//     });

//     // saves banner collection
//     $document.on('click', '#saveBannerCollection', () => {
//       var modalData = editBannerCollectionModal.getData();
//       var bannerIds = [];

//       _.forEach(
//         editBannerCollectionModal.getElement('.targetListItem'),
//         listItem => {
//           bannerIds.push($(listItem).find('.banner').data('id'));
//         }
//       );

//       if (modalData.minActive === undefined) {
//         modalData.minActive = 0;
//       }

//       $.ajax({
//         type: 'Post',
//         url: w.Urls['UpdateBannerCollection'],
//         data: {
//           CollectionId: modalData.collectionId,
//           BannerIds: bannerIds,
//           MultipleActive: modalData.multipleActive,
//           MinActive: modalData.minActive,
//         },
//         success(result) {
//           if (result.success) {
//             var $collection = $('.bannerCollection').filterData(
//               'collection-id',
//               modalData.collectionId
//             );
//             const displayUrl = $collection.data('displayUrl');
//             const salePage = $collection.data('salePage');

//             if (salePage) {
//               $.post(displayUrl, { bannerIds }, partial => {
//                 $collection
//                   .find('.activeBannersContainer')
//                   .replaceWith(partial);
//               });
//             } else {
//               $.get(
//                 w.Urls['GetDisplayBannerCollectionPartial'],
//                 $collection.data(),
//                 partial => {
//                   $collection.replaceWith(partial);
//                 }
//               );
//             }

//             editBannerCollectionModal.hide();
//             notification.success('Successfully Updated Banner Collection!');
//           } else {
//             alert.error(result.error);
//           }
//         },
//       });
//     });

//     // opens edit banner from edit collections modal
//     $('#editBannerCollectionModalBody').on('click', '.editBanner', e => {
//       e.preventDefault();
//       e.stopPropagation();

//       var $this = $(e.currentTarget);
//       editBannerCollectionModal.hide();
//       editBanner($this);

//       modals.push(addEditBannerPhotoModal);
//     });

//     // opens edit banner modal
//     $document.on('click', '.editBanner', e => {
//       e.preventDefault();
//       e.stopPropagation();

//       var $this = $(e.currentTarget);
//       editBanner($this);

//       modals.push(addEditBannerPhotoModal);
//     });

//     // opens add banner modal for new banner
//     $document.on('click', '.addBanner', e => {
//       e.preventDefault();
//       e.stopPropagation();

//       var $this = $(e.currentTarget);
//       var url = $this.data('url');
//       var $bannerSection = $this
//         .parents('.bannerCollection')
//         .addClass('addingBanner');
//       var layoutId = $bannerSection.data('layoutId');
//       var bannerId = $bannerSection.data('id');
//       var collectionId = $bannerSection.data('collectionId');
//       var device = $bannerSection.data('device');
//       var type = $bannerSection.data('type');

//       var params = {
//         LayoutId: layoutId,
//         Create: true,
//         Type: type,
//         Device: device,
//         BannerId: bannerId,
//         CollectionId: collectionId,
//       };

//       openAddEditBannerModal(url, params);

//       modals.push(addEditBannerPhotoModal);
//     });

//     // handles the edit button closing and re-opening of collections modal
//     $document.on('hidden.bs.modal', '#addEditBannerModal', () => {
//       modals.pop();

//       var modalLength = modals.length;
//       if (modalLength > 0) {
//         var modalName = modals[modals.length - 1];

//         if (modalName.elementId !== 'addEditBannerModal') {
//           modalName.show();
//         }
//       }
//     });

//     $document.on('hidden.bs.modal', '#editBannerCollectionModal', () => {
//       modals.pop();
//     });

//     // opens add layout modal
//     $document.on('click', '.addLayout', e => {
//       e.preventDefault();

//       var $this = $(e.currentTarget);
//       var url = $this.data('url');
//       var layoutWrapper = $this.parents('.layoutWrapper');

//       addLayoutModal.setData({
//         layoutWrapper: layoutWrapper,
//         layoutUrl: layoutWrapper.data('url'),
//       });

//       addLayoutModal.loadContentByUrl(url, undefined, () => {
//         $.validator.unobtrusive.parse('#createLayoutForm');
//         addLayoutModal.show();

//         $document.trigger('create-layout-modal-loaded');
//       });
//     });

//     // saves edited layout
//     $document.on('click', '#saveLayout', e => {
//       e.preventDefault();

//       var $this = $(e.currentTarget);
//       var data = $this.data() as any;

//       var $editLayoutWrapper = $this.parents('.editLayoutWrapper');
//       var layoutName = $editLayoutWrapper.find('.layoutName').val();
//       var $layoutWrapper = $editLayoutWrapper.parents('.layoutWrapper');

//       if (layoutName === '') {
//         $editLayoutWrapper
//           .find('.field-validation-valid')
//           .text('Name is Required')
//           .show();
//       } else {
//         $.ajax({
//           type: 'post',
//           url: data.url,
//           data: { LayoutName: layoutName },
//           success(serializedResult) {
//             var result = JSON.parse(serializedResult);
//             if (result.success) {
//               $layoutWrapper.load($layoutWrapper.data('url'), {
//                 LayoutId: data.id,
//               });
//               notification.success('Successfully edited layout.');
//             } else {
//               $editLayoutWrapper
//                 .find('.field-validation-valid')
//                 .text(result.error)
//                 .show();
//             }
//           },
//         });
//       }
//     });

//     // selects layout if one was created
//     $document.on('hidden.bs.modal', '#createLayoutModal', function () {
//       var created = $(this).find('.success');
//       if (created.length > 0) {
//         var layoutId = created.data('layout-id');
//         var createLayoutModalData = addLayoutModal.getData();

//         createLayoutModalData.layoutWrapper.load(
//           createLayoutModalData.layoutUrl,
//           { LayoutId: layoutId },
//           () => {
//             $document.trigger('edit-layout-model-loaded');
//             notification.success('Successfully added new layout!');
//           }
//         );
//       }
//     });

//     // sets layout status as active, sets all other layouts as inactive
//     $document.on('click', '.setActiveLayout', function (e) {
//       e.preventDefault();

//       var $this = $(this);
//       var url = $this.attr('post-url');
//       var data = $this.data();
//       var $pageSelection = $this.closest('[page-selection]');
//       var $layoutSelection = $pageSelection
//         .find('.layout-selection-list-item')
//         .filterData('id', data.layoutId);

//       $.ajax({
//         type: 'Post',
//         url: url,
//         data: data,
//         success(result) {
//           if (result.success) {
//             $layoutSelection.parent().prepend($layoutSelection);
//             $document.trigger('active-layout-set', [
//               { layoutid: data.layoutId },
//             ]);
//             notification.success('Successfully set active layout!');
//           } else {
//             alert.error(result.error);
//           }
//         },
//       });
//     });

//     $document.on('click', '[edit-banner-photo]', e => {
//       e.preventDefault();
//       var id = $(e.currentTarget).data('id');

//       addEditBannerPhotoModal.hide();
//       editPhoto(id, data => {});
//     });

//     $document.on('hidden.bs.modal', '#photoEditorModal', () => {
//       var modalLength = modals.length;
//       if (modalLength > 0) {
//         var modalName = modals[modals.length - 1];
//         modalName.show();
//       }
//     });

//     // selects layout
//     $document.on('click', '.layout-selection', e => {
//       e.preventDefault();

//       var $this = $(e.currentTarget);
//       var $layout = $this.parent();
//       var layoutId = $layout.data('id');
//       var url = $layout.data('url');

//       $this.parents('.layoutWrapper').load(url, { LayoutId: layoutId }, () => {
//         $document.trigger('layout-selection-loaded');
//       });
//     });

//     // selects banner collection for layout
//     $document.on('click', '.bannerCollectionSelection', e => {
//       e.preventDefault();

//       var $this = $(e.currentTarget);
//       var device = $this.data('device');
//       var $collection = $this.parents('.bannerCollection');
//       var data = {
//         MultipleActive: $collection.data('multiple-active'),
//         LayoutId: $collection.data('layout-id'),
//         Device: device,
//         Type: $collection.data('type'),
//       };

//       $.get(w.Urls['GetDisplayBannerCollectionPartial'], data, partial => {
//         $collection.replaceWith(partial);
//       });
//     });

//     // select video modal
//     var selectVideoModalOptions = new Modal.LsModalOptions();
//     selectVideoModalOptions.id = 'selectVideoModal';
//     selectVideoModalOptions.width = '1100px';
//     selectVideoModalOptions.bodyId = 'selectVideoModalBody';
//     selectVideoModalOptions.title = 'Select Video';
//     var selectVideoModal = new Modal.LsModal(selectVideoModalOptions);

//     // open select video modal
//     $document.on('click', '.selectBannerVideo', e => {
//       e.preventDefault();

//       var $this = $(e.currentTarget);
//       var url = $this.data('url');
//       var locationId = $this.parents('.input-group').find('input').attr('id');

//       selectVideoModal.setData({
//         locationId: `#${locationId}`,
//       });

//       addEditBannerPhotoModal.hide();
//       selectVideoModal.loadBodyByUrl(
//         url,
//         { parentId: 'selectVideoModalBody', pageSize: 10 },
//         () => {
//           selectVideoModal.show();
//         }
//       );
//     });

//     // selects video and sets video location
//     $document.on('click', '.selectVideo', e => {
//       e.preventDefault();

//       var $this = $(e.currentTarget);
//       var modalData = selectVideoModal.getData();
//       var location = $this.data('location');

//       $(modalData.locationId).val(location);
//       selectVideoModal.hide();
//     });

//     // on close select video modal
//     $document.on('hidden.bs.modal', '#selectVideoModal', () => {
//       selectVideoModal.hide();
//       addEditBannerPhotoModal.show();
//     });

//     ////////////////////////////////////////////////////////////////////
//     //////////////////// OLD EDIT SALE PAGE STUFF /////////////////////
//     //////////////////////////////////////////////////////////////////

//     var isFeatured: boolean;

//     // updates special offer feature status and moves to correct table
//     $document.on('click', '.feature-status', e => {
//       e.preventDefault();

//       var $featureButton = $(e.currentTarget);
//       var $specialOffer = $featureButton.parents('.specialOffer');
//       var id = $specialOffer.data('id');

//       isFeatured = !$specialOffer.hasClass('featured');

//       updateSpecialOfferStatus({ Id: id, Feature: isFeatured }, result => {
//         if (result.success) {
//           notification.success('Successfully changed the featured status.');

//           var $items;
//           if (isFeatured) {
//             $featureButton.text('Daily');
//             $items = $('.specialOffer.featured');
//           } else {
//             $featureButton.text('Feature');
//             $items = $('.specialOffer:not(.featured)');
//           }
//           $items.insertElement('id', $specialOffer);
//           $specialOffer.toggleClass('featured');
//         } else {
//           alert.error(result.error);
//         }
//       });
//     });

//     // updates special offer public status and removes from table
//     $document.on('click', '.public-status', e => {
//       e.preventDefault();

//       var $specialOffer = $(e.currentTarget).parents('.specialOffer');
//       var id = $specialOffer.data('id');

//       updateSpecialOfferStatus({ Id: id, PublicView: false }, result => {
//         if (result.success) {
//           $specialOffer.remove();
//         } else {
//           alert.error(result.error);
//         }
//       });
//     });

//     // select special offer
//     var selectSpecialOfferModalOptions = new Modal.LsModalOptions();
//     selectSpecialOfferModalOptions.id = 'selectSpecialOfferModal';
//     selectSpecialOfferModalOptions.width = '900px';
//     selectSpecialOfferModalOptions.bodyId = 'selectSpecialOfferContent';
//     selectSpecialOfferModalOptions.title = 'Select Special Offer';
//     var selectSpecialOfferModal = new Modal.LsModal(
//       selectSpecialOfferModalOptions
//     );

//     // opens select special offer
//     $document.on('click', '.selectSpecialOfferButton', e => {
//       e.preventDefault();
//       isFeatured = $(e.currentTarget).data('featured');
//       selectSpecialOfferModal.loadBodyByUrl(
//         w.Urls['SearchSpecialOffers'],
//         { parentId: 'selectSpecialOfferContent' },
//         () => {
//           selectSpecialOfferModal.show();
//         }
//       );
//     });

//     // selects special offer and sets featured status, public status, and active status then creates partial and puts in table
//     $document.on('click', '.offerName', e => {
//       e.preventDefault();

//       var $specialOffer = $(e.currentTarget).parents('.specialOfferRow');
//       var id = $specialOffer.data('id');
//       var $items;

//       $.ajax({
//         type: 'Post',
//         url: w.Urls['UpdateSpecialOfferStatuses'],
//         data: { Id: id, Feature: isFeatured, PublicView: true, Active: true },
//         success(serializedResult) {
//           const result = JSON.parse(serializedResult);
//           if (result.success) {
//             $.get(
//               w.Urls['GetSpecialOfferDisplayPartial'],
//               { Id: id },
//               partial => {
//                 if (isFeatured) {
//                   $items = $('.specialOffer.featured');
//                   $items.insertElement('id', $(partial), true);
//                 } else {
//                   $items = $('.specialOffer:not(.featured)');
//                   $items.insertElement('id', $(partial), true);
//                 }
//                 selectSpecialOfferModal.hide();
//               }
//             );
//           } else {
//             alert.error(result.error);
//           }
//         },
//       });
//     });

//     // ajax call to update special offer statuses
//     function updateSpecialOfferStatus(data, callback) {
//       if (data !== undefined && callback !== undefined) {
//         $.ajax({
//           type: 'POST',
//           url: w.Urls['UpdateSpecialOfferStatuses'],
//           data: data,
//           success(serializedResult) {
//             callback(JSON.parse(serializedResult));
//           },
//         });
//       }
//     }

//     ////////////////////////////////////////////////////////////////////
//     //////////////////// END OLD EDIT SALE PAGE STUFF /////////////////////
//     //////////////////////////////////////////////////////////////////

//     function updateAllImages() {
//       var $this = $(this);
//       var $form = $this.parents('form');
//       var $imageTiles = $form.find('[image-tile]');

//       if ($this.is(':checked')) {
//         $imageTiles
//           .filter(function () {
//             return $(this).data('index') !== 0;
//           })
//           .hide();
//       } else {
//         $imageTiles.show();
//       }
//     }

//     function editPhoto(id, success) {
//       var editPhotoModalOptions = new Modal.LsModalOptions();
//       editPhotoModalOptions.id = 'photoEditorModal';
//       editPhotoModalOptions.contentId = 'photoEditorModalContent';
//       editPhotoModalOptions.width = '50%';
//       var editPhotoModal = new Modal.LsModal(editPhotoModalOptions);

//       $.ajax({
//         url: w.Urls['EditPhoto'],
//         data: { Id: id },
//         dataType: 'html',
//         success(result) {
//           var $content = editPhotoModal.getElement('.modal-content');
//           $content.html(result);
//           var $form = $content.find('form');

//           $form.find('[update-all-images]').on('change', updateAllImages);
//           editPhotoModal.show();
//         },
//       });

//       modals.push(editPhotoModal);

//       w.EditPhotoSuccess = form => {
//         var $form = $(form);
//         var $message = $form.find('.notification-message');
//         if (
//           $message.length > 0 &&
//           success !== undefined &&
//           typeof success === 'function'
//         ) {
//           var data = $message.data();
//           $form.find('img').each((index, img) => {
//             var $img = $(img);
//             var name = $img.data('name');
//             var src = $img.attr('src');
//             data[name] = src;
//           });

//           success(data);
//         }
//       };
//     }

//     // edit banner functionality
//     function editBanner($this: JQuery) {
//       var $banner;
//       if ($this.hasClass('banner')) {
//         $banner = $this;
//       } else {
//         $banner = $this.parents('.banner');
//       }

//       var url = $banner.data('url');
//       var layoutId = $banner.data('layoutId');
//       var bannerId = $banner.data('id');
//       var collectionId = $banner.data('collectionId');
//       var device = $banner.data('device');
//       var type = $banner.data('type');
//       var openCollection = $banner.data('openCollection');

//       var params = {
//         LayoutId: layoutId,
//         Create: false,
//         Type: type,
//         Device: device,
//         BannerId: bannerId,
//         CollectionId: collectionId,
//         OpenCollection: openCollection,
//       };

//       openAddEditBannerModal(url, params);
//     }

//     // edit banner collections functionality
//     function editBannerCollections($this: JQuery) {
//       var url = $this.data('url');
//       var $collection = $this.parents('.bannerCollection');
//       var collectionData = $collection.data() as any;
//       var bannerIds = [];

//       _.forEach($collection.find('.banner'), banner => {
//         bannerIds.push($(banner).data('id'));
//       });

//       collectionData.selectedIds = bannerIds;

//       editBannerCollectionModal.setData({
//         updated: collectionData.updated,
//         multipleActive: collectionData.multipleActive,
//         minActive: collectionData.minActive,
//         collectionId: collectionData.collectionId,
//         layoutId: collectionData.layoutId,
//         type: collectionData.type,
//         device: collectionData.device,
//         multiSelectUrl: collectionData.url,
//         selectedIds: bannerIds,
//       });

//       var params = {
//         multipleActive: collectionData.multipleActive,
//         minActive: collectionData.minActive,
//         collectionId: collectionData.collectionId,
//         layoutId: collectionData.layoutId,
//         type: collectionData.type,
//         device: collectionData.device,
//         selectedIds: bannerIds,
//       };

//       var modalData = editBannerCollectionModal.getData();
//       if (
//         modalData.updated ||
//         !modalData.collectionId ||
//         modalData.collectionId !== collectionData.collectionId
//       ) {
//         if (collectionData.multipleActive) {
//           editBannerCollectionModal.setTitleHtml(
//             'Edit Active Banners and Their Order'
//           );
//         } else {
//           editBannerCollectionModal.setTitleHtml('Edit Active Banner');
//         }
//       } else {
//         editBannerCollectionModal.show();
//       }

//       editBannerCollectionModal.loadBodyByUrl(url, params, () => {
//         if (modals.length === 0) {
//           modals.push(editBannerCollectionModal);
//         }
//       });
//     }

//     // open add/edit banner functionality
//     function openAddEditBannerModal(url, params) {
//       addEditBannerPhotoModal.loadContentByUrl(url, params, () => {
//         $.validator.unobtrusive.parse('#editBannerForm');
//         addEditBannerPhotoModal.setData({
//           openCollection: params.OpenCollection,
//         });
//         addEditBannerPhotoModal.$modal
//           .find('#LiveTextFontColor')
//           .trigger('input');
//       });
//     }

//     ////////////////////////////////////////////////////////////////////
//     ///////////////////////// DROPFILE STUFF //////////////////////////
//     //////////////////////////////////////////////////////////////////

//     // shows or hides foreground link info
//     $document.on('click', '.foregroundLinkInfo', e => {
//       var $this = $(e.currentTarget);
//       var sameStatus = $this.val() === 'True';
//       var $layerContainer = $this.parents('.layerContainer');
//       var $linkTypeContainer = $layerContainer.find('.linkTypeContainer');
//       var $linkDetails = $layerContainer.find('.linkDetails');

//       if (sameStatus) {
//         $linkDetails.hide();
//         $linkTypeContainer.hide();
//       } else {
//         $linkDetails.show();
//         $linkTypeContainer.show();
//       }
//     });

//     // switchs link type
//     $document.on('click', '.linkType', e => {
//       var $this = $(e.currentTarget);
//       var linkType = $this.val();
//       var $layerContainer = $this.parents('.layerContainer');
//       $layerContainer
//         .find('.linkProperties')
//         .hide()
//         .filter((i, linkProp) => {
//           var $linkProp = $(linkProp);
//           var data = $linkProp.data();

//           if (data.approvedType && data.approvedType === linkType) {
//             return true;
//           }

//           if (data.rejectedType && data.rejectedType !== linkType) {
//             return true;
//           }

//           return false;
//         })
//         .show();
//     });

//     // opens file selection
//     $document.on('click', '.bannerImageDropzone', e => {
//       var $this = $(e.currentTarget);
//       var data = $this.data();

//       $('#bannerImageFile').data(data).trigger('click');
//     });

//     // todo - remove after image compression is 100% live ------- not sure if we should delete this since we have compression tool behind a setting...
//     if (w.compressSetting === 'False') {
//       $document.on('change', '#bannerImageFile', function () {
//         var data = $(this).data();
//         if (
//           this.files !== undefined &&
//           data.height !== undefined &&
//           data.width !== undefined
//         ) {
//           readFile(this.files, data);
//         }
//       });
//     }

//     // gets dropped file and reads contents
//     if (w.compressSetting === 'False') {
//       $document.on('drop', '#backgroundImageDrop', dropFile);
//     }

//     // stops default events
//     $document.on('dragover', '.bannerImageDropzone', fileDragHover);

//     // stops default events
//     $document.on('dragleave', '.bannerImageDropzone', fileDragHover);

//     // prevents default and propagation events
//     function fileDragHover(e) {
//       e.preventDefault();
//       e.stopPropagation();
//     }

//     // reads contents of dropped files and sets display image
//     function readFile(dropfiles, imageData) {
//       var reader = new FileReader();
//       var $imageElement = $(`#${imageData.name}Image`);
//       var file = dropfiles[0];
//       var result = reader.result.toString();

//       reader.onloadend = () => {
//         $imageElement.attr('src', result).show();
//         var ext = file.name.substring(file.name.indexOf('.') + 1);
//         $(`#${imageData.name}FileExtension`).val(ext);
//         $(`#${imageData.name}ImageLocation`).val(result);
//       };

//       if (file && $imageElement.length > 0) {
//         reader.readAsDataURL(file);
//       }
//     }

//     function dropFile(e) {
//       fileDragHover(e);
//       var data = $(e).data();

//       readFile(e.dataTransfer.files, data);
//     }

//     ////////////////////////////////////////////////////////////////////
//     ///////////////////////// END DROPFILE STUFF //////////////////////////
//     //////////////////////////////////////////////////////////////////
//   }
// }

// export default ManagePages;
