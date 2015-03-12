/**
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2015 hybris AG
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of hybris
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with hybris.
 */

'use strict';

/**
 *  Encapsulates access to the "authorization" service.
 */
angular.module('ds.coupon')
    .factory('CouponSvc', ['$q', '$http', 'SiteConfigSvc', 'CouponREST', 'CartREST',
        function($q, $http, siteConfig, CouponREST, CartREST){


        return {

            /**
             * Make sure that the coupon code entered by the client can be actually used for the order.
             * Returns a promise of the service result for upstream error handling.
             */
             validateCoupon: function( couponCode ) {
debugger;
                var deferred = $q.defer();
                if (couponCode) {
                    var couponRequest = this.buildCouponRequest(couponCode);

                    CouponREST.Coupon.one('coupons', couponCode).customPOST(couponRequest, 'validation').then(function () {
                            debugger;
                            deferred.resolve();
                        }, function (resp) {
                            debugger;
                            deferred.reject(resp);
                        });
                } else {
                    debugger;
                    deferred.reject();
                }
                return deferred.promise;
             },

            /**
             * Retrieves coupon data for customer coupon application request.
             * Returns a promise of the result.
             */
             getDiscount: function( couponCode ) {
debugger;
                var deferred = $q.defer();
                if (couponCode) {
                    //https://{domain}/coupon/v1/{tenant}/coupons/{code}
                    CouponREST.Coupon.one('coupons', couponCode).get().then(function (resp) {
                            debugger;
                            var couponData = resp.plain();
                            deferred.resolve(couponData);
                        }, function (resp) {
                            debugger;
                            deferred.reject(resp);
                        });
                } else {
                    debugger;
                    deferred.reject();
                }
                return deferred.promise;
             },

            /**
             * Retrieves coupon data for customer coupon application request.
             * Returns a promise of the result.
             */
             getRedeemedCoupon: function( couponCode ) {
debugger;
                var deferred = $q.defer();
                if (couponCode) {
                    //https://{domain}/coupon/v1/{tenant}/coupons/{code}/redemptions
                    CouponREST.Coupon.one('coupons', couponCode).customGET('redemptions').then(function (resp) {
                            debugger;
                            deferred.resolve(resp);
                        }, function () {
                            debugger;
                            deferred.reject();
                        });
                } else {
                    debugger;
                    deferred.reject();
                }
                return deferred.promise;
             },

            /**
             * Retrieves coupon data for customer coupon application request.
             * Returns a promise of the result.
             */
             redeemCoupon: function( couponObj, cartId ) {
debugger;
                var deferred = $q.defer();
                var couponCode = couponObj.code;
                var couponType = couponObj.discountType;
                if (couponCode) {
                    var couponRequest = this.buildCouponRequest(couponCode);
                    //https://api.yaas.io/coupon/v1/{tenant}/coupons/{code}/redemptions
                    CouponREST.Coupon.one('coupons', couponCode).customPOST( couponRequest, 'redemptions').then(function (resp) {
                            debugger;
                        var couponId = resp.plain().id;
                        var cartRequest = {

        // "id": {
        //     "required": false,
        //     "type": "string"
        // },
        // "code": {
        //     "type": "string",
        //     "description":"The discount code.",
        //     "required": true,
        //     "maxLength" : "150"
        // },
        // "amount": {
        //     "type": "number",
        //     "description":"The fixed price of the discount.",
        //     "minimum" : 0
        // },
        // "currency": {
        //     "description": "The currency code following the ISO 4217 standard.",
        //     "type": "string",
        //     "required": true,
        //     "pattern" : "[A-Z]{3}"
        // },
        // "name": {
        //     "type": "string",
        //     "description":"The discount display name.",
        //     "maxLength" : "150"
        // },
        // "discountRate": {
        //     "type": "number",
        //     "description":"The percentage value of the discount.",
        //     "minimum" : 0
        // },
        // "sequenceId": {
        //     "type": "integer",
        //     "description":"The sequence of this discount to be applied to cart.",
        //     "default":1,
        //     "minimum" : 0
        // },
        // "calculationType": {
        //     "type": "string",
        //     "description":"Possible Values are ApplyDiscountBeforeTax, ApplyDiscountAfterTax. The calculation type to be applied while calculating the discounts.",
        //     "maxLength" : "30",
        //     "default": "ApplyDiscountBeforeTax"
        // },
        // "links": {
        //     "type": "array",
        //     "items": {
        //         "$ref": "link"
        //     },
        //     "minItems" : "1"
        // }

                            // if ( couponData.discountType === 'ABSOLUTE' ) {
                            //     $scope.coupon.amounts.discountAmount = couponData.discountAbsolute.amount;
                            // }
                            // else if ( couponData.discountType === 'PERCENT' ) {
                            //     debugger;
                            //     $scope.coupon.amounts.discountAmount = ( 0.01 * $scope.coupon.amounts.originalAmount * couponData.discountPercentage.amount);
                            // }


    'id': couponId,
    'code': 'ZXCV',
    'amount': '1.99',
    'currency': 'USD',
    'name': 'zxcv',
    'sequenceId': '1',
    'calculationType': 'ApplyDiscountBeforeTax',
    'link': [{
        'id': couponId,
        'type': 'COUPON',
        'url': 'http://localhost/coupons/'+couponId
    }]



                        };
                        //  post coupon redemption to cart
                        // https://api.yaas.io/cart/v5/bsdtestproject/cart/5501e7264d6ea5a71b0ceef9/discounts
                        // https://api.yaas.io/cart/v5 /tenantId/carts /cartId/discounts
                        CartREST.Cart.one('cart', cartId).customPOST( cartRequest, 'discounts').then(function () {
                                debugger;
                                deferred.resolve();
                            }, function () {
                                debugger;
                                deferred.reject();
                            });
                        }, function () {
                            debugger;
                            deferred.reject();
                        });
                } else {
                    debugger;
                    deferred.reject();
                }
                return deferred.promise;
             },
            /**
             * Retrieves coupon data for customer coupon application request.
             * Returns a promise of the result.
             */
             redeemCouponAtomic: function( couponCode ) {
debugger;
                var deferred = $q.defer();
                if (couponCode) {
                    var couponRequest = this.buildCouponRequest(couponCode);
                    //https://api.yaas.io/coupon/v1/{tenant}/coupons/{code}/redemptions
                    CouponREST.Coupon.one('coupons', couponCode).customPOST( couponRequest, 'redemptions').then(function () {
                            debugger;
                            deferred.resolve();
                        }, function () {
                            debugger;
                            deferred.reject();
                        });
                } else {
                    debugger;
                    deferred.reject();
                }
                return deferred.promise;
             },

            /**
             * Retrieves coupon data for customer coupon application request.
             * Returns a promise of the result.
             */
//              redeemCouponCart: function( couponCode, orderId ) {
// debugger;
//                 var deferred = $q.defer();
//                 if (couponCode) {
//                     var couponRequest = this.buildCouponRequest(orderId);
//                     https://api.yaas.io/coupon/v1/{tenant}/coupons/{code}/redemptions
//                     CouponREST.Coupon.one('coupons', couponCode).customPOST( couponRequest, 'redemptions').then(function (resp) {
//                             var response = resp.plain();
//                             debugger;
//                             deferred.resolve();
//                         }, function () {
//                             debugger;
//                             deferred.reject();
//                         });
//                 } else {
//                     debugger;
//                     deferred.reject();
//                 }
//                 return deferred.promise;
//              },

             buildCouponRequest: function( couponCode ){
                return {
                        'orderCode': couponCode,
                        'orderTotal': {
                            'currency': 'USD',
                            'amount': 49.99
                        },
                        'discount': {
                            'currency': 'USD',
                            'amount': 10
                        }
                        //! check out removing this dis
                    };
             }

        };

    }]);