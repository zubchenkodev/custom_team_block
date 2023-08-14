import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const SaveBlock = () => {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content/>
		</div>
	);
}

export default SaveBlock;
