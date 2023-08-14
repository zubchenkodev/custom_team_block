import { __ } from '@wordpress/i18n';

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import './editor.scss';

const EditBlock = () => {
	return (
		<div {...useBlockProps()}>
		<h2>Team Members Block</h2>
			<InnerBlocks
			allowedBlocks={["viktorias-blocks/team-member"]}
			>
			</InnerBlocks>
		</div>
	);
}

export default EditBlock;
