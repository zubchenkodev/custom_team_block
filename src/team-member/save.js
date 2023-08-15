import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const SaveBlock = ( { attributes } ) => {
	const { name, bio, imageUrl, imageAlt, imageId } = attributes;

	return (
		<div { ...useBlockProps.save() }>
			{ imageUrl && (
				<img
					src={ imageUrl }
					alt={ imageAlt }
					className={ imageId ? `wp-image-${ imageId }` : '' }
				/>
			) }
			<RichText.Content tagName="h4" value={ name } />
			<RichText.Content tagName="p" value={ bio } />
		</div>
	);
};

export default SaveBlock;
