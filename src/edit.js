import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

import './editor.scss';

const EditBlock = ( { attributes, setAttributes } ) => {
	const { columns } = attributes;

	const onChangeColumnsCount = ( newCount ) => {
		setAttributes( { columns: newCount } );
	};

	return (
		<div
			{ ...useBlockProps( {
				className: `has-${ columns }-cols`,
			} ) }
		>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={ __( 'Template settings', 'viktorias-block' ) }
						min={ 1 }
						max={ 4 }
						onChange={ onChangeColumnsCount }
						value={ columns }
					/>
				</PanelBody>
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={ [ 'viktorias-blocks/team-member' ] }
				template={ [
					[ 'viktorias-blocks/team-member' ],
					[ 'viktorias-blocks/team-member' ],
					[ 'viktorias-blocks/team-member' ],
					[ 'viktorias-blocks/team-member' ],
				] }
			></InnerBlocks>
		</div>
	);
};

export default EditBlock;
