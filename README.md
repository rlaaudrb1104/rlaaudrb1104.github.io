<?php
namespace um\core;

- if ( ! defined( 'ABSPATH' ) ) exit;
+ if ( ! defined( 'ABSPATH' ) ) {
+     exit;
+ }

if ( ! class_exists( 'um\core\Register' ) ) {

	class Register {

-		function __construct() {
-			add_action( 'um_after_register_fields',  array( $this, 'add_nonce' ) );
-			add_action( 'um_submit_form_register', array( $this, 'verify_nonce' ), 1, 1 );
+		public function __construct() {
+			add_action( 'um_after_register_fields', array( $this, 'add_nonce' ) );
+			add_action( 'um_submit_form_register', array( $this, 'verify_nonce' ), 1, 2 );
		}

		public function add_nonce() {
			wp_nonce_field( 'um_register_form' );
		}

		/**
		 * Verify nonce handler
		 *
-		 * @param $args
-		 *
-		 * @return mixed
+		 * @param array $args
+		 * @param array $form_data
		 */
-		public function verify_nonce( $args ) {
+		public function verify_nonce( $args, $form_data ) {
			
-			$allow_nonce_verification = apply_filters( 'um_register_allow_nonce_verification', true );
+			$allow_nonce_verification = apply_filters( 'um_register_allow_nonce_verification', true, $form_data );

			if ( ! $allow_nonce_verification  ) {
-				return $args;
+				return;
			}

-			if ( ! wp_verify_nonce( $args['_wpnonce'], 'um_register_form' ) || empty( $args['_wpnonce'] ) || ! isset( $args['_wpnonce'] ) ) {
-				$url = apply_filters( 'um_register_invalid_nonce_redirect_url', add_query_arg( [ 'err' => 'invalid_nonce' ] ) );
-				exit( wp_redirect( $url ) );
+			if ( empty( $args['_wpnonce'] ) || ! wp_verify_nonce( $args['_wpnonce'], 'um_register_form' ) ) {
+				// @todo add hookdocs
+				$url = apply_filters( 'um_register_invalid_nonce_redirect_url', add_query_arg( array( 'err' => 'invalid_nonce' ) ) );
+				wp_safe_redirect( $url );
+				exit;
			}

-			return $args;
		}
	}
}
