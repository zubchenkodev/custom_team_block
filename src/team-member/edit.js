import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls,
	store,
} from '@wordpress/block-editor';

import { isBlobURL, revokeBlobURL } from '@wordpress/blob';

import {
	Spinner,
	withNotices,
	ToolbarButton,
	PanelBody,
	TextareaControl,
	SelectControl,
} from '@wordpress/components';

import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import '../editor.scss';

const EditBlock = ( props ) => {
	const { attributes, setAttributes, noticeOperations, noticeUI } = props;
	const { name, bio, imageAlt, imageId, imageUrl } = attributes;
	const [ blobUrl, setBlobUrl ] = useState();

	const imageObject = useSelect(
		( select ) => {
			const { getMedia } = select( 'core' );
			return imageId ? getMedia( imageId ) : null;
		},
		[ imageId ]
	);

	const imageSizes = useSelect( ( select ) => {
		return select( store ).getSettings().imageSizes;
	}, [] );

	const getImageSizeOptions = () => {
		if ( ! imageObject ) return [];
		const options = [];
		const sizes = imageObject.media_details.sizes;
		for ( const key in sizes ) {
			const size = sizes[ key ];
			const imageSize = imageSizes.find( ( s ) => s.slug === key );
			if ( imageSize ) {
				options.push( {
					label: imageSize.name,
					value: size.source_url,
				} );
			}
		}
		return options;
	};

	const onChangeName = ( newName ) => {
		setAttributes( { name: newName } );
	};

	const onChangeBio = ( newBio ) => {
		setAttributes( { bio: newBio } );
	};

	const onSelectImage = ( newImage ) => {
		if ( ! newImage || ! newImage.url ) {
			setAttributes( {
				imageAlt: '',
				imageId: undefined,
				imageUrl: undefined,
			} );
			return;
		}
		setAttributes( {
			imageAlt: newImage.alt,
			imageId: newImage.id,
			imageUrl: newImage.url,
		} );
	};

	const onRemoveImage = () => {
		setAttributes( {
			imageAlt: '',
			imageId: undefined,
			imageUrl: undefined,
		} );
	};

	const onChangeAlt = ( newAlt ) => {
		setAttributes( { imageAlt: newAlt } );
	};

	const onChangeImageSize = ( newUrl ) => {
		setAttributes( { imageUrl: newUrl } );
	};

	const onUploadError = ( message ) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	};

	useEffect( () => {
		if ( ! imageId && isBlobURL( imageUrl ) ) {
			setAttributes( {
				imageAlt: '',
				imageId: undefined,
				imageUrl: undefined,
			} );
		}
	}, [] );

	useEffect( () => {
		if ( isBlobURL( imageUrl ) ) {
			setBlobUrl( imageUrl );
		} else {
			revokeBlobURL( blobUrl );
			setBlobUrl();
		}
	}, [ imageUrl ] );

	return (
		<>
			<InspectorControls>
				{ imageUrl && ! isBlobURL( imageUrl ) && (
					<PanelBody
						title={ __( 'Image Settings', 'viktorias-block' ) }
					>
						<TextareaControl
							label={ __( 'Alt', 'viktorias-block' ) }
							value={ imageAlt }
							onChange={ onChangeAlt }
						/>
						<SelectControl
							label={ __( 'Image Size', 'viktorias-block' ) }
							options={ getImageSizeOptions() }
							value={ imageUrl }
							onChange={ onChangeImageSize }
						/>
					</PanelBody>
				) }
			</InspectorControls>
			{ imageUrl && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						onSelect={ onSelectImage }
						onError={ onUploadError }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
						mediaId={ imageId }
						mediaURL={ imageUrl }
					/>
					<ToolbarButton
						icon="trash"
						label="Remove"
						onClick={ onRemoveImage }
					/>
				</BlockControls>
			) }
			<div { ...useBlockProps() }>
				{ imageUrl && (
					<div
						className={ `member-card__image ${
							isBlobURL( imageUrl ) ? 'is-loading' : ''
						}` }
					>
						<img src={ imageUrl } alt={ imageAlt } />
						{ isBlobURL( imageUrl ) && <Spinner /> }
					</div>
				) }
				<MediaPlaceholder
					icon="format-image"
					onSelect={ onSelectImage }
					onError={ onUploadError }
					accept="image/*"
					allowedTypes={ [ 'image' ] }
					disableMediaButtons={ imageUrl }
					notices={ noticeUI }
				/>
				<RichText
					title={ __( 'Name', 'viktorias-block' ) }
					placeholder={ __( 'Enter the name', 'viktorias-block' ) }
					tagName="h4"
					allowedFormats={ [] }
					value={ name }
					onChange={ onChangeName }
				/>
				<RichText
					title={ __( 'Bio', 'viktorias-block' ) }
					placeholder={ __( 'Enter the bio', 'viktorias-block' ) }
					tagName="p"
					allowedFormats={ [] }
					value={ bio }
					onChange={ onChangeBio }
				/>
			</div>
		</>
	);
};

export default withNotices( EditBlock );
