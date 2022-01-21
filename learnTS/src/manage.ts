import * as $ from "jquery";
let modals = Object
let compressSetting: string
var w = window as any;
let Modal = Object
let showsitewidealertnotificationarea = Function;
//interface Modals {ßß
//    id: string;
//    width: string;
//    contentId: string;
//}

//function Modal(Modal: Object) {
//    this.Modal = Modal


//}
//type modaltype = string[] | boolean[];
  
 
(function (window, $, _) {
    var modals = {}/*, isFeatured*/
   
    // DOM ready
    $(function () {
        $.event.props.push("dataTransfer");

        modals["editbannermodal"] = new Modal({
            id: "editbannermodal",
            width: "900px",
            contentid: "editbannercontainer"
        });



        modals["editBannerCollectionModal"] = new Modal({
            id: "editBannerCollectionModal",
            width: "75%",
            title: "Select Banners",
            saveButtonId: "saveBannerCollection"
        });
    });

     //ajax call to update special offer statuses
    function updateSpecialOfferStatus(data, callback) {
        if (data !== undefined && callback !== undefined) {
            $.ajax({
                type: "POST",
                url: window.Urls["UpdateSpecialOfferStatuses"],
                data: data,
                datatype: "json",
                success: function (serializedResult) {
                    callback(JSON.parse(serializedResult));
                }
            });
        }
    }

    function selectSiteUrl(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        var data = $(this).data();

        var addModal = modals["addDynamicPage"];

        addModal.getElement(".siteUrlPath").val(data.absolutePath);
        addModal.getElement(".siteUrlId").val(data.id);
        addModal.getElement(".formWrapper").show();

        modals["selectSiteUrl"].hide();
    }

     //prevents default and propagation events
    function fileDragHover(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // reads contents of dropped files and sets display image
    function readFile(dropfiles, imageData) {
        var reader = new FileReader();

        var $imageElement = $("#" + imageData.name + "Image");
        var file = dropfiles[0];

        reader.onloadend = function () {
            $imageElement.attr("src", reader.result).show();
            var ext = file.name.substring(file.name.indexOf(".") + 1);
            $("#" + imageData.name + "FileExtension").val(ext);
            $("#" + imageData.name + "ImageLocation").val(reader.result);
        };

        if (file && $imageElement.length > 0) {
            reader.readAsDataURL(file);
        }
    }

    // gets dropped file and reads contents
    function dropFile(e) {

        fileDragHover(e);

        var data = $(this).data();

        readFile(e.dataTransfer.files, data);
    }

    // opens edit banner modal
    function openEditBannerModal(data, create) {
        modals["editBannerModal"].loadContentByUrl(window.Urls["GetEditLayoutBannerPartial"], { LayoutId: data.layoutId, Create: create, Type: data.type, Device: data.device, BannerId: data.id, CollectionId: data.collectionId }, function () {
            $.validator.unobtrusive.parse("#editBannerForm");
            modals["editBannerModal"].openCollection = data.openCollection;
            modals["editBannerModal"].show();
        });
    };

   //  todo: comment this out for testing
   //  opens edit banner modal for new banner
    $(document).on("click", ".addBanner", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var data = $(this).parents(".bannerCollection").addClass("addingBanner").data();
        openEditBannerModal(data, true);
    });

 //    selects layout
    $(document).on("click", ".layout-selection", function (e) {
        e.preventDefault();

        var $layout = $(this).parent();

        var layoutId = $layout.data("id");


        $(this).parents(".layoutWrapper").load(window.Urls["GetEditLayoutModelPartial"], { LayoutId: layoutId }, function() {
            $(document).trigger("layout-selection-loaded");
        });
    });

  //   selects banner collection for layout
    $(document).on("click", ".bannerCollectionSelection", function (e) {
        e.preventDefault();

        var device = $(this).data("device");

        var $collection = $(this).parents(".bannerCollection");

        var data = {
            MultipleActive: $collection.data("multiple-active"),
            LayoutId: $collection.data("layout-id"),
            Device: device,
            Type: $collection.data("type")
        };

        $.get(window.Urls["GetDisplayBannerCollectionPartial"], data, function (partial) {
            $collection.replaceWith(partial);
        });
    });

    // sets layout status as active, sets all other layouts as inactive
    $(document).on("click", ".setActiveLayout", function (e) {
        e.preventDefault();

        var $this = $(this);
        var url = $this.attr("post-url");
        var data = $this.data();
        var $pageSelection = $this.closest("[page-selection]");
        var $layoutSelection = $pageSelection.find(".layout-selection-list-item").filterData("id", data.layoutId);

        $.ajax({
            type: "Post",
            url: url,
            data: data,
            datatype: "json",
            success: function (result) {
                if (result.success) {
                    $layoutSelection.parent().prepend($layoutSelection);
                } else {
                    alert(result.error);
                }
            }
        });
    });

  //   opens add layout modal
    $(document).on("click", ".addLayout", function (e) {
        e.preventDefault();

        var url = $(this).data("url");

        if (modals["createLayoutModal"] === undefined) {
            modals["createLayoutModal"] = new Modal({
                id: "createLayoutModal",
                width: "350px",
                contentId: "createLayoutContent"
            });
        }

        modals["createLayoutModal"].layoutWrapper = $(this).parents(".layoutWrapper");

        modals["createLayoutModal"].loadContentByUrl(url,
            undefined,
            function() {
                $.validator.unobtrusive.parse("#createLayoutForm");
                modals["createLayoutModal"].show();
                $(document).trigger("create-layout-modal-loaded");
            });
    });


  //   selects layout if one was created
    $(document).on("hidden.bs.modal", "#createLayoutModal", function () {

        var created = $(this).find(".success");

        if (created.length > 0) {
            var layoutId = created.data("layout-id");
            modals["createLayoutModal"].layoutWrapper.load(window.Urls["GetEditLayoutModelPartial"], { LayoutId: layoutId }, function() {
                $(document).trigger("edit-layout-model-loaded");
            });
        }
    });


     creates new layout
    $(document).on("click", "#saveLayout", function (e) {
        e.preventDefault();

        var data = $(this).data();
        var useNewLayoutEditor = $(this).hasClass("newLayoutEditor");
        var $editLayoutWrapper = $(this).parents(".editLayoutWrapper");

        var layoutName = $editLayoutWrapper.find(".layoutName").val();

        if (layoutName === "") {
            $editLayoutWrapper.find(".field-validation-valid").text("Name is Required").show();
        } else {

            $.ajax({
                type: "Post",
                url: data.url,
                data: { LayoutName: layoutName },
                datatype: "json",
                success: function (serializedResult) {
                    var result = JSON.parse(serializedResult);

                    if (result.success) {
                        $editLayoutWrapper.parents(".layoutWrapper").load(window.Urls["GetEditLayoutModelPartial"], { LayoutId: data.id, newEditLayoutModel: useNewLayoutEditor });
                    } else {
                        $editLayoutWrapper.find(".field-validation-valid").text(result.error).show();
                    }
                }
            });
        }
    });

   //  opens edit banner collection modal
    $(document).on("click", ".editBannerCollection", function (e) {
        e.preventDefault();
        var $collection = $(this).parents(".bannerCollection");

        var collectionData = $collection.data();

        var url = window.Urls["MultiSelectBannersFromBannerCollection"];

        var modal = modals["editBannerCollectionModal"];

        var bannerIds = [];

        _.forEach($collection.find(".banner"), function (banner) {
            bannerIds.push($(banner).data("id"));
        });

        collectionData.selectedIds = bannerIds;

        if (modal.updated || !modal.collectionId || modal.collectionId !== collectionData.collectionId) {
            if (collectionData.multipleActive) {
                modal.setTitleHtml("Edit Active Banners and Their Order");
            } else {
                modal.setTitleHtml("Edit Active Banner");
            }

            modal.loadBodyByUrl(url, collectionData, function () {
                modal.updated = false;
                modal.multipleActive = collectionData.multipleActive;
                modal.minActive = collectionData.minActive;
                modal.collectionId = collectionData.collectionId;
                modal.show();
            });
        } else {
            modal.show();
        }
    });

 //    todo: comment this out for testing
 //    opens edit banner modal
    $(document).on("click", ".editBanner", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $banner;

        if ($(this).hasClass("banner")) {
            $banner = $(this);
        } else {
            $banner = $(this).parents(".banner");
        }

        var data = $banner.data();

        modals["editBannerCollectionModal"].hide();

        openEditBannerModal(data, false);
    });

  //   shows or hides foreground link info
    $(document).on("click", ".foregroundLinkInfo", function () {

        var sameStatus = $(this).val() === "True";
        var $layerContainer = $(this).parents(".layerContainer");
        var $linkTypeContainer = $layerContainer.find(".linkTypeContainer");
        var $linkDetails = $layerContainer.find(".linkDetails");

        if (sameStatus) {
            $linkDetails.hide();
            $linkTypeContainer.hide();
        } else {
            $linkDetails.show();
            $linkTypeContainer.show();
        }
    });

  //   switchs link type
    $(document).on("click", ".linkType", function () {
        var linkType = $(this).val();
        var $layerContainer = $(this).parents(".layerContainer");
        $layerContainer.find(".linkProperties").hide().filter(function (index, linkProp) {
            var $linkProp = $(linkProp);
            var data = $linkProp.data();

            if (data.approvedType && data.approvedType === linkType) {
                return true;
            }

            if (data.rejectedType && data.rejectedType !== linkType) {
                return true;
            }

            return false;
        }).show();
    });

  //   open select video modal 
    $(document).on("click", ".selectBannerVideo", function (e) {
        e.preventDefault();
        modals["editBannerModal"].hide();
        modals["editBannerModal"].selectVideo = true;

        if (!modals["selectVideoModal"]) {
            modals["selectVideoModal"] = new Modal({
                id: "selectVideoModal",
                width: "1100px",
                title: "Select Video",
                bodyId: "selectVideoModalBody"
            });

            modals["selectVideoModal"].loadBodyByUrl(window.Urls["SearchVideos"], { parentId: "selectVideoModalBody", pageSize: 10 }, function () {
                modals["selectVideoModal"].show();
            });
        } else {
            modals["selectVideoModal"].show();
        }

        modals["selectVideoModal"].locationId = "#" + $(this).parents(".input-group").find("input").attr("id");
    });

  //   shows edit banner modal
    $(document).on("hidden.bs.modal", "#selectVideoModal", function () {
        modals["editBannerModal"].selectVideo = false;
        modals["editBannerModal"].show();
    });

  //   selects video and sets video location
    $(document).on("click", ".selectVideo", function (e) {
        e.preventDefault();

        $(modals["selectVideoModal"].locationId).val($(this).data("location"));

        modals["selectVideoModal"].hide();
    });

    // opens file selection 
    $(document).on("click", ".bannerImageDropzone", function () {
        $("#bannerImageFile").data($(this).data()).trigger("click");
    });

    // todo - remove after image compression is 100% live
    if (compressSetting === "False") {
        $(document).on("change", "#bannerImageFile", function () {

            var data = $(this).data();

            if (this.files !== undefined && data.height !== undefined && data.width !== undefined) {
                readFile(this.files, data);
            }
        });
    }

    // stops default events
    $(document).on("dragover", ".bannerImageDropzone", fileDragHover);

    // stops default events
    $(document).on("dragleave", ".bannerImageDropzone", fileDragHover);

    // gets dropped file and reads contents
    if (compressSetting === "False") {
        $(document).on("drop", "#backgroundImageDrop", dropFile);
    }

    // gets dropped file and reads contents
    if (compressSetting === "False") {
        $(document).on("drop", "#foregroundImageDrop", dropFile);
    }

 //    saves banner collection
    $(document).on("click", "#saveBannerCollection", function () {

        var modal = modals["editBannerCollectionModal"];

        var bannerIds = [];

        _.forEach(modal.getElement(".targetListItem"), function (listItem) {
            bannerIds.push($(listItem).find(".banner").data("id"));
        });

        if (modal.minActive === undefined) {
            modal.minActive = 0;
        }


        $.ajax({
            type: "post",
            url: window.urls["updatebannercollection"],
            data: { collectionid: modal.collectionid, bannerids: bannerids, multipleactive: modal.multipleactive, minactive: modal.minactive },
            datatype: "json",
            success: function (result) {
                if (result.success) {
                    var $collection = $(".bannercollection").filterdata("collection-id", modal.collectionid);

                    if ($collection.data("salepage")) {
                        $.post($collection.data("displayurl"), { bannerids: bannerids }, function (partial) {
                            $collection.find(".activebannerscontainer").replacewith(partial);
                        });
                    } else {
                        $.get(window.urls["getdisplaybannercollectionpartial"], $collection.data(), function (partial) {
                            $collection.replacewith(partial);
                        });
                    }

                    modal.hide();

                    showsitewidealertnotificationarea();
                } else {
                    alert(result.error);
                }
            }
        });
      
    });

  //   handles edit banner modal closing
    $(document).on("hidden.bs.modal", "#editBannerModal", function () {
        var $modal = $(this);
        let modals;
        var $updated = $modal.find(".updated");

        if (modals["editBannerModal"].selectVideo) {
            return;
        }

        if ($updated.length > 0) {
            var created = $updated.data("created");
            var active = $updated.data("active");
            var collectionId = parseInt($modal.find("#CollectionId").val());
            var $collection, data, url = window.Urls["GetDisplayBannerCollectionPartial"];

            if (created) {
                if (active) {
                    $collection = $(".bannerCollection.addingBanner");

                    if ($collection.length > 0 && $collection.data("id") === 0) {
                        $collection.data("collection-id", collectionId);
                    }

                    data = $collection.data();

                    $.get(url, data, function (partial) {
                        $collection.replaceWith(partial);
                    });
                }
            } else {

                $collection = $(".bannerCollection").filterData("collection-id", collectionId);

                data = $collection.data();

                if (modals["editBannerModal"].openCollection) {
                    modals["editBannerCollectionModal"].loadBodyByUrl(window.Urls["MultiSelectBannersFromBannerCollection"], data, function () {
                        modals["editBannerCollectionModal"].show();
                    });
                } else if (data.salePage) {
                    var bannerId = $modal.find("#BannerId").val();
                    $.post(data.displayUrl, { bannerIds: bannerId }, function (partial) {
                        $collection.find(".activeBannersContainer").replaceWith(partial);
                    });
                } else {
                    $.get(url, data, function (partial) {
                        $collection.replaceWith(partial);
                    });
                }
            }

            modals["editBannerCollectionModal"].updated = true;
        } else {
            if (modals["editBannerModal"].openCollection) {
                modals["editBannerCollectionModal"].show();
            }
        }
    });

   //  updates special offer feature status and moves to correct table
    $(document).on("click", ".feature-status", function (e) {
        e.preventDefault();

        var $featureButton = $(this);

        var $specialOffer = $featureButton.parents(".specialOffer");

        let isFeatured = !$specialOffer.hasClass("featured");

        var id = $specialOffer.data("id");

        updateSpecialOfferStatus({ Id: id, Feature: isFeatured }, function (result) {
            if (result.success) {
                var $items;
                if (isFeatured) {
                    $featureButton.text("Daily");
                    $items = $(".specialOffer.featured");
                } else {
                    $featureButton.text("Featured");
                    $items = $(".specialOffer:not(.featured)");
                }
                $items.insertElement("id", $specialOffer);
                $specialOffer.toggleClass("featured");
            } else {
                alert(result.error);
            }
        });
    });

    // updates special offer public status and removes from table
    $(document).on("click", ".public-status", function (e) {
        e.preventDefault();

        var $specialOffer = $(this).parents(".specialOffer");

        var id = $specialOffer.data("id");

        updateSpecialOfferStatus({ Id: id, PublicView: false }, function (result) {
            if (result.success) {
                $specialOffer.remove();
            } else {
                alert(result.error);
            }
        });
    });

     opens select special offer
    $(document).on("click", ".selectSpecialOffer", function (e) {
        e.preventDefault();

         isFeatured = $(this).data("featured");

        if (modals["specialOfferSelectModal"] === undefined) {
            modals["specialOfferSelectModal"] = new Modal({
                id: "selectSpecialOfferModal",
                bodyId: "selectSpecialOfferContent",
                title: "Select Special Offer",
                width: "900px"
            });

            modals["specialOfferSelectModal"].loadBodyByUrl(window.Urls["SearchSpecialOffers"], { parentId: "selectSpecialOfferContent" }, function () {
                modals["specialOfferSelectModal"].show();
            });
        } else {
            modals["specialOfferSelectModal"].show();
        }
    });

     selects special offer and sets featured status, public status, and active status then creates partial and puts in table
    $(document).on("click", ".offerName", function (e) {
        e.preventDefault();

        var $specialOffer = $(this).parents(".specialOfferRow");

        var id = $specialOffer.data("id");

        $.ajax({
            type: "Post",
            url: window.Urls["UpdateSpecialOfferStatuses"],
            data: { Id: id, Feature: isFeatured, PublicView: true, Active: true },
            datatype: "json",
            success: function (serializedResult) {
                var result = JSON.parse(serializedResult);

                if (result.success) {
                    $.get(window.Urls["GetSpecialOfferDisplayPartial"], { Id: id }, function (partial) {

                        if (isFeatured) {
                            $(".specialOffer.featured").insertElement("id", $(partial), true);
                        } else {
                            $(".specialOffer:not(.featured)").insertElement("id", $(partial), true);
                        }
                        modals["specialOfferSelectModal"].hide();
                    });
                } else {
                    alert(result.error);
                }
            }
        });
    });

    // opens select categories modal
    $(document).on("click", "#editSpotlightCategories", function (e) {
        e.preventDefault();

        var modal = modals["selectCategoriesModal"];

        if (!modal) {
            modal = new Modal({
                id: "selectCategoriesModal",
                width: "75%",
                title: "Select the 4 \"In The Spotlight\" Categories",
                saveButtonId: "saveSpotlightCategories"
            });

            var categoryIds = $(".spotLightCategory").map(function () { return $(this).data("id"); }).get();

            modal.loadBodyByUrl(window.Urls["MultiSelectCategories"], { SelectedIds: categoryIds, Sortable: true }, function () {
                modal.show();
            });

            modals["selectCategoriesModal"] = modal;
        } else {
            modal.show();
        }

        modal.$page = $(this).parents(".page");
    });

    // saves selected categories to spotlight on homepage
    $(document).on("click", "#saveSpotlightCategories", function (e) {
        e.preventDefault();

        var modal = modals["selectCategoriesModal"];

        var categoryIds = modal.getElement(".targetListItem").map(function () { return $(this).data("id"); }).get();

        $.ajax({
            type: "Post",
            url: window.Urls["UpdateHomePageInTheSpotlight"],
            data: { CategoryIds: categoryIds },
            datatype: "json",
            success: function (result) {
                if (result.success) {
                    showSiteWideAlertNotificationArea();
                    modal.hide();
                    $("#spotlightCategoriesWrapper").load(window.Urls["GetSpotlightCategoriesPartial"]);
                } else {
                    alert(result.error);
                }
            }
        });
    });

     opens select brands modal
    $(document).on("click", "#editFavoriteBrands", function (e) {
        e.preventDefault();

        var modal = modals["selectBrandsModal"];
        if (!modal) {
            modal = new Modal({
                id: "selectBrandsModal",
                width: "75%",
                title: "Select the 12 Favorite Brands",
                saveButtonId: "saveFavoriteBrands"
            });

            var brandIds = $(".favoriteBrand").map(function () {
                return $(this).data("id");
            }).get();

            modal.loadBodyByUrl(window.Urls["MultiSelectBrands"], { SelectedIds: brandIds, Sortable: true }, function () {
                modal.show();
            });
            modals["selectBrandsModal"] = modal;

        } else {
            modal.show();
        }

        modal.$page = $(this).parents(".page");
    });

    // saves selected categories to spotlight on homepage
    $(document).on("click", "#saveFavoriteBrands", function (e) {
        e.preventDefault();


        var modal = modals["selectBrandsModal"];

        var brandIds = modal.getElement(".targetListItem").map(function () { return $(this).data("id"); }).get();

        $.ajax({
            type: "Post",
            url: window.Urls["UpdateHomePageFavoriteBrands"],
            data: { BrandIds: brandIds },
            datatype: "json",
            success: function (result) {
                if (result.success) {
                    showSiteWideAlertNotificationArea();
                    modal.hide();
                    $("#favoriteBrandsWrapper").load(window.Urls["GetFavoriteBrandsPartial"]);
                } else {
                    alert(result.error);
                }
            }
        });
    });

    $(document).on("click", "#addDynamicPage", function (e) {
        e.preventDefault();

        var modal = modals["addDynamicPage"];

        if (modal == undefined) {
            modal = new Modal({
                id: "addDynamicPageModal",
                title: "Create new Dynamic Page",
                contentId: "addDynamicPageModalBody"
            });

            modals["addDynamicPage"] = modal;
        }

        modal.loadContentByUrl(window.Urls["GetCreateDynamicPagePartial"], { parentId: "addDynamicPageModalBody" }, function () {
            modal.show();
        });
    });

    $(document).on("click", ".searchSiteUrls", function (e) {
        e.preventDefault();

        var modal = modals["selectSiteUrl"];

        if (modal == undefined) {
            modal = new Modal({
                id: "selectSiteUrlModal",
                width: "900px",
                title: "Select Site Url",
                bodyId: "selectSiteUrlModalBody"
            });

            modal.loadBodyByUrl(window.Urls["SearchSiteUrls"], { parentId: "selectSiteUrlModalBody", hideActions: true }, function () {
                $(document).on("click", ".selectSiteUrl", selectSiteUrl);
                modal.show();
            });

            modals["selectSiteUrl"] = modal;
        } else {
            modal.show();
        }
    });

    $(document).on("click", "[edit-banner-photo]", function (e) {
        e.preventDefault();
        var id = $(this).data("id");

        modals["editBannerModal"].hide();

      w.EditPhoto(id, function (data) {
            modals["editBannerModal"].show();
        });
    });

    w.DynamicPageCreateSuccess = function (form) {

        var $message = $(form).find(".notification-message");

        if ($message.length > 0) {
            window.location.href = window.Urls["DetailsDynamicPage"] + "/" + $message.data("id");
        }
    }
})(window, jQuery, _);