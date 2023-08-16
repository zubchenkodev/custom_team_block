import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const SaveBlock = ( { attributes } ) => {
	const { name, bio, imageUrl, imageAlt, imageId, socialLinks } = attributes;

	return (
		<div { ...useBlockProps.save() }>
			{ imageUrl && (
				<img
					src={ imageUrl }
					alt={ imageAlt }
					className={ imageId ? `wp-image-${ imageId }` : '' }
				/>
			) }
			{ name && <RichText.Content tagName="h4" value={ name } /> }
			{ bio && <RichText.Content tagName="p" value={ bio } /> }
			{ socialLinks && (
				<div className="member-card__social-icons">
					<ul>
						{ socialLinks.map( ( socialLink, index ) => {
							return (
								<li key={ index } data-icon={ socialLink.icon }>
									<a href={ socialLink.link }>
										<Icon icon={ socialLink.icon } />
									</a>
								</li>
							);
						} ) }
					</ul>
				</div>
			) }
		</div>
	);
};

export default SaveBlock;
