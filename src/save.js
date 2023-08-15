import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const SaveBlock = ( { attributes } ) => {
	const { columns } = attributes;

	return (
		<div
			{ ...useBlockProps.save( {
				className: `has-${ columns }-cols`,
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
};

export default SaveBlock;
