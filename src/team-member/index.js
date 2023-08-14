import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import EditBlock from './edit';
import SaveBlock from './save';

import '../style.scss';

registerBlockType( 'viktorias-blocks/team-member', {
	title: __( 'Team Member', 'viktorias-blocks' ),
	category: 'media',
	icon: 'admin-users',
	description: __( 'Single Team Member Block.', 'viktorias-blocks' ),
	parent: [ 'viktorias-blocks/team-block' ],
	supports: {
		reusable: false,
		html: false,
	},
	attributes: {
		name: {
			type: 'string',
			source: 'html',
			selector: 'h4',
		},
		bio: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
	},
	edit: EditBlock,
	save: SaveBlock,
} );
