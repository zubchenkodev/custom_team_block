<?php
/**
 * Plugin Name:       Team Block
 * Description:       Team Block
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Viktoria Zubchenko
 * Text Domain:       viktorias-blocks
 */

function viktorias_blocks_team_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'viktorias_blocks_team_block_init' );
